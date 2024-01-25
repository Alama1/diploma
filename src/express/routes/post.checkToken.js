const axios = require("axios");
const jwt = require('jsonwebtoken')

class Auth {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/check-token'

    async handleRequest(req, res) {
        console.log(req.body)
        res.setHeader('Access-Control-Allow-Origin', '*')
        if (!req.body.hasOwnProperty('token')) {
            res.status(400).json({"Status": "Error", "Message": "You need to specify token."})
            return
        }
        const userData = await this.app.database.verifyToken(req.body.token)
        if (userData === 'jwt expired') {
            res.status(401).json({"Status": "Error", "Message": "JWT token expired"})
            return
        }
        delete userData.user.password
        return res.status(200).json({"Status": "Success!", "Message": userData})
    }
}

module.exports = Auth