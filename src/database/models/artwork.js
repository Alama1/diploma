const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        url: {
            type: String,
            required: [true, 'You need to specify url.'],
            unique: [true, 'This username is already taken.']
        },
        description: {
            type: String,
            required: [true, 'Description is required.']
        },
        genre: {
            type: String,
            required: [true, 'Genre is required.']
        },
        author: {
            type: String,
            required: [true, 'Artwork author is required.']
        },
        uploader: {
            type: String,
            required: [true, 'Uploader is required.']
        },
        type: {
            type: String,
            required: [true, 'Type of artwork is required.']
        }
    }
)


const userModel = model('artwork', schema)

module.exports = userModel
