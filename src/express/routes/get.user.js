class GetUser {
    constructor(app) {
        this.app = app
    }
    method = 'GET'
    path = '/user'

    async handleRequest(req, res) {
        const getTablesResponse = await this.app.database.getUserWithEmail(req.body.email)
        if (getTablesResponse.status === 'Error') {
            return res.status(500).json(getTablesResponse)
        }
        return res.status(200).json(getTablesResponse)
    }
}

module.exports = GetUser