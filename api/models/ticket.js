const mongoose = require('mongoose')


const ticket = new mongoose.Schema({

    username: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    seatNo: {
        type: String
    },
    ticketStatus: {
        type: String
    },
    from: {
        type: String,
        default:""
    },
    to: {
        type: String,
        default:""
    },
    pickUpTime: {
        type: String,
        default:""
    },
    dropTime: {
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },

},{collection: 'ticket'})

module.exports = mongoose.model('ticket',ticket);