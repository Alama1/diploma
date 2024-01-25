const mongoose = require('mongoose')
const {readdirSync} = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
const {models} = require("mongoose");
require('dotenv').config()

class databaseManager {
    constructor(app) {
        this.app = app
        this.config = this.app.config.properties
    }

    async init() {
        this.client = await mongoose.connect(this.config.mongo.authString.replace('<password>', this.config.mongo.authPassword), {
            dbName: this.app.config.properties.mongo.databaseName
        })

        let modelNames = readdirSync(path.join(__dirname, 'models')).filter(file => file.endsWith('.js'))
        this.models = new Map()
        for (const file of modelNames) {
            const model = (require(`./models/${file}`))
            this.models.set(file.split('.')[0], model)
        }
    }

    async createNewUser(user) {
        const cardModel = this.models.get('user')
        try {
            const res = await cardModel.create(user)
            return {
                status: 'Success!',
                message: `Card with id of '${res._id}' was created!`
            }
        } catch (e) {
            if (e.name === 'ValidationError') {
                return {
                    status: 'Error',
                    message: Object.values(e.errors).map(val => val.message)
                }
            }
            if (e.code === 11000) {
                return {
                    status: 'Error',
                    message: `Duplicate entry.`,
                    duplicates: Object.keys(e.keyValue)
                }
            }
            return {
                status: 'Error',
                message: 'Some unhandled error!'
            }
        }
    }

    async getUserWithEmail(email) {
        const userModel = this.models.get('user')
        try {
            const user = await userModel.find({
                email: email,
            })
            if (user.length === 0) {
                return {
                    status: 'Error',
                    message: 'Users with this email were not found.'
                }
            }
            return {
                status: "Success!",
                message: user
            }
        } catch (e) {
            console.log(e)
            return {
                status: 'Error',
                message: 'Unexpected error'
            }
        }
    }

    async updatePassword(email, newPassword, oldPassword) {
        const userModel = this.models.get('user')
        if (!await this.checkPassword(email, oldPassword)) {
            return {
                status: 'Error',
                message: 'Email/password is not correct'
            }
        }
        try {
            const res = await userModel.findOneAndUpdate({
                    email: email
                },
                {
                    password: newPassword
                })
            return {
                status: 'Success!',
                message: 'Password updated successfully.'
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Changed error'
            }
        }
    }

    async authorise(email, password) {
        if (!await this.checkPassword(email, password)) {
            return {
                status: 'Error',
                message: 'Email/password is not correct'
            }
        }
        const userModel = this.models.get('user')
        const user = await userModel.findOne({
            email: email
        })
        delete user.password
        const token = await jwt.sign({user}, process.env.JWT_TOKEN, {expiresIn: '1d'})
        return {
            status: 'Success!',
            message: {
                token
            }
        }
    }

    async addNewArtwork(artwork) {
        const artworkModel = this.models.get('artwork')
        try {
            return await artworkModel.create(artwork)
        } catch (e) {
            return e
        }
    }

    async getGenres() {
        try {
            const artworkModel = this.models.get('artwork')
            const res = await artworkModel.find({}, 'genre')
            return {
                status: 'Success!',
                message: [...new Set(res.map((element) => { return element.genre }))]
            }
        } catch (e) {

        }
    }

    async getArtworks() {
        try {
            const artworkModel = this.models.get('artwork')
            const res = await artworkModel.find()
            return {
                status: 'Success!',
                message: res
            }
        } catch (e) {
            return {
                status: 'Error',
                message: 'Cannot load artworks.'
            }
        }
    }

    async checkPassword(email, password) {
        try {
            const userModel = this.models.get('user')
            const user = await userModel.findOne({
                email: email
            })
            return user.password === password;

        } catch (e) {
            return false
        }
    }

    async verifyToken(token) {
        try{
            return jwt.verify(token, process.env.JWT_TOKEN)
        } catch (e) {
            return e.message
        }
    }
}

module.exports = databaseManager