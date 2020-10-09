const Users = require('../../models/Users')
const Auctions = require('../../models/Auctions')
const config = require('config')

module.exports = checkCards = async (req, res, next) => {
    try {
        const {owner, card} = req.body
        const user = await Users.findOne({_id: owner})

        if (!user || user.role === config.get('roles.admin'))
           return next()

        const auctions = await Auctions.find({owner, status: true})

        const blockCardLen = auctions.filter(auc => auc.card == card).length
        const userCardLen = user.cards.filter(uCard => uCard._id == card).length

        if (userCardLen <= blockCardLen) {
            return res.send('You cant make bet')
        }

        next()
    } catch (e) {
        res.send(e.message)
    }
}