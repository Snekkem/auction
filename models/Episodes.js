const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {type: String, required: true},
    episode: {type: String},
    air_date: {type: Date, default: new Date().toISOString(), required: true}
})

module.exports = mongoose.model('episodes', schema)