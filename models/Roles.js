const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    role: {type: String, default: 'User'}
})

module.exports = mongoose.model('roles', schema)