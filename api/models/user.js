const mongoose = require('mongoose')


const user = new mongoose.Schema({

    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    registeredTime: {
        type: String
    },
    loginTime: {
        type: String,
        required: true,
    },
    logOutTime: {
        type: String
    }

},{collection: 'user'})

module.exports = mongoose.model('user',user);