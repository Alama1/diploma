class PutUserPassword {
    constructor(app) {
        this.app = app
    }
    method = 'PUT'
    path = '/userPassword'

    async handleRequest(req, res) {
        const passwordRes = await this.app.database.updatePassword(req.body.email, req.body.newPassword, req.body.oldPassword)
        console.log(passwordRes)
        if (passwordRes.message === 'There is no table with this id.') {
            return res.status(409).json(passwordRes)
        }
        return res.status(200).json(passwordRes)
    }
}

module.exports = PutUserPassword