const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = mongoose.model('Document', documentSchema)