const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    can_create_cards: {type: Boolean, default: false}
})

module.exports = mongoose.model('settings', schema)