const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    sum: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('transactions', schema)