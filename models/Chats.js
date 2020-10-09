const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    message: {type: String, required: true},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('chats', schema)