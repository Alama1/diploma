const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'You need to specify username.'],
            unique: [true, 'This username is already taken.']
        },
        password: {
            type: String,
            required: [true, 'Password is undefined.']
        },
        email: {
            type: String,
            required: [true, 'You need to specify email address.'],
            unique: [true, 'This email is already exists.']
        },
        rating: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: 'User'
        },
    }
)


const userModel = model('user', schema)

module.exports = userModel
