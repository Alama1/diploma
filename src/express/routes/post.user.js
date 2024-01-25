class PostUser {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/user'

    async handleRequest(req, res) {
        const newUserResponse = await this.app.database.createNewUser(req.body)
        if (newUserResponse.message === 'User with this id already exists!') {
            return res.status(409).json(newUserResponse)
        }
        if (newUserResponse.status === 'Error' && typeof newUserResponse.message === 'object') {
            return res.status(422).json(newUserResponse)
        }
        return res.status(200).json(newUserResponse)
    }
}

module.exports = PostUser