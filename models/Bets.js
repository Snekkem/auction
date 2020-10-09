const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    auction: {type: Schema.Types.ObjectId, ref: 'auctions'}, //для истории
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    bet: {type: Number},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('bets', schema)