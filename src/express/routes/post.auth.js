class Auth {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/auth'

    async handleRequest(req, res) {
        const authResponse = await this.app.database.authorise(req.body.email, req.body.password)
        if (authResponse.status === 'Error') {
            return res.status(403).json(authResponse)
        }
        return res.status(200).json(authResponse)
    }
}

module.exports = Auth