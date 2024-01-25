const axios = require("axios");
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Artwork {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/artwork'

    async handleRequest(req, res) {
        const {url, genre, token, author, type} = req.body
        const userData = await this.app.database.verifyToken(token)
        if (!userData) {
            return res.status(401).json({
                status: 'Error',
                message: 'Token is not valid, please re-authorise and try again.'
            })
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/generate_caption', {
                image_url: url,
                type: type
            })
            return res.status(200).json({
                status: 'Success!',
                message: {
                    url,
                    caption: `Caption: ${response.data.caption} of the ${genre} genre.`,
                    token: jwt.sign({url, caption: response.data.caption, userData, genre, author, type}, process.env.JWT_TOKEN),
                    userData,
                    author,
                    genre
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                status: 'Error',
                message: 'Unexpected error.'
            })
        }

    }
}

module.exports = Artwork