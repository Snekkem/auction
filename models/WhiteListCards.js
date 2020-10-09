const {Schema, model} = require('mongoose')

const schema = new Schema({
    card: {type: Schema.Types.ObjectId, ref: 'cards', required: true, unique: true}
})

module.exports = model('whitelistcards', schema)