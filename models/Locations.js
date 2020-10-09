const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String},
    dimension: {type: String, required: true},
    created_at: {type: Date, default: new Date().toISOString()}
})


module.exports = mongoose.model('locations', schema)