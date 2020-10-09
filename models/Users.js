const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    balance: {type: Number, required: true, default: 0},
    rating: {type: Number, required: true, default: 0},
    role: {type: String, ref: 'roles'},
    sets: [{
        setId: {type: Schema.Types.ObjectId, ref: 'sets', required: true},
        isCards: [{
            cardId: {type: Schema.Types.ObjectId, ref: 'cards', required: true},
            isCard: {type: Boolean, required: true}
        }]
    }], //у sets есть array карточек , а тут уже готовый сет {type: Schema.Types.ObjectId, ref: 'sets'}
    cards: [{type: Schema.Types.ObjectId, ref: 'cards'}],
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    created_at: {type: Date, default: new Date().toISOString()}
})

module.exports = model('users', schema)