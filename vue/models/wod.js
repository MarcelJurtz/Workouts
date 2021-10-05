const { Schema, model } = require('mongoose')

const WodSchema = new Schema({
    name: {
        type: String
    },
    permalink: {
        type: String
    },
    tag: {
        type: String
    },
    description: {
        type: String
    },
    excercises: Array,
    equipment: Array,
    created: {
        type: Date,
        default: Date.now
    }
})

const Wod = model('wod', WodSchema)
module.exports = Wod