const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    set_name: {type: String, required: true},
    set: [{type: Schema.Types.ObjectId, ref: 'cards'}],
    bonus: {type: Number, required: true},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('sets', schema)