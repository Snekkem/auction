const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    start_bet: {type: Number, required: true},
    min_step_bet: {type: Number, required: true},
    max_duration_auctions: {type: Number, required: true},
    min_extension_time: {type: Number, required: true},
    end_auction: {type: Date, required: true},
    max_bet: {type: Number},
    card: {type: Schema.Types.ObjectId, ref: 'cards'},
    owner: {type: Schema.Types.ObjectId, ref: 'users'},
   // last_bet: {type: Schema.Types.ObjectId, ref: 'bets', default: null},
    status: {type: Boolean, default: true},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = mongoose.model('auctions', schema)