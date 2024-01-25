class Genres {
    constructor(app) {
        this.app = app
    }
    method = 'GET'
    path = '/genres'

    async handleRequest(req, res) {
        const genresResponse = await this.app.database.getGenres()
        if (genresResponse.message === 'There is no table with this id.') {
            return res.status(409).setHeader('content-type', 'application/json').json(genresResponse)
        }
        return res.status(200).json(genresResponse)
    }
}

module.exports = Genres