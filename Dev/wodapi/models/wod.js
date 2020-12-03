const { Schema, model } = require('mongoose')

const WodSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Wod = model('wod', WodSchema)
module.exports = Wod