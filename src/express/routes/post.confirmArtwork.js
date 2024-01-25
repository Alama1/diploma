class ConfirmArtwork {
    constructor(app) {
        this.app = app
    }

    method = 'POST'
    path = '/confirm-artwork'

    async handleRequest(req, res) {

        const validateToken = await this.app.database.verifyToken(req.body.token)
        if (!validateToken) {
            return res.status(401).json({
                status: 'Error',
                message: 'Artwork token is expired/not available.'
            })
        }
        const response = await this.app.database.addNewArtwork({
            url: validateToken.url,
            description: validateToken.caption,
            genre: validateToken.genre,
            author: validateToken.author,
            uploader: validateToken.userData.user.username,
            type: validateToken.type
        })
        console.log(response)
        if (response.code === 11000) {
            return res.status(428).json({
                status: 'Error',
                message: 'Image with this url is already uploaded.'
            })
        }
        return res.status(201).json({
            status: 'Success!',
            message: 'Image uploaded successfully!'
        })
    }
}

module.exports = ConfirmArtwork