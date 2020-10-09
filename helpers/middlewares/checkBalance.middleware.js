const Users = require('../../models/Users')
const Auctions = require('../../models/Auctions')
const Bets = require('../../models/Bets')

module.exports = checkBalance = async (req, res, next) => {
    try {
        const userData = await Users.findOne({_id: req.body.user})

        if (req.body.bet > userData.balance)
            return res.send('Insufficient funds! Top up your balance.');

        const auctions = await Auctions.find({status: true})
        const lastUserBids = []
        for (const auction of auctions) {
            const lastBid = await Bets.findOne({
                auction: auction._id,
                user: req.body.user
            }, {}, {sort: {'bet': -1}})

            lastBid && lastUserBids.push(lastBid)
        }

        let sum = lastUserBids.reduce((currentValue, acc) => acc.bet + currentValue, 0)

        if (sum > userData.balance)
            res.send('Insufficient funds! Top up your balance.');

        next()
    } catch (e) {
        res.status(401).json('Something went wrong!')
    }
}