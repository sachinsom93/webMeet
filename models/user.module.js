const mongoose = require('mongoose')

// create a schema for mongo collection
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel