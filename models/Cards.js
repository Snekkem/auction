const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {type: String, required: true},
    status: {type: String, enum: ['Alive', 'Dead', 'unknown']},
    type: {type: String},
    gender: {type: String, enum: ['Female', 'Male', 'Genderless', 'unknown']},
    locations: [{type: Schema.Types.ObjectId, ref: 'locations'}],
    episodes: [{type: Schema.Types.ObjectId, ref: 'episodes'}],
    image: {type: String},
    cardType: {type: String, enum: ['starter', 'custom'], required: true},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('cards', schema)