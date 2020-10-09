const calculate = require('./calculateRating')
const Auctions = require('../models/Auctions')
const Users = require('../models/Users')
const Bets = require('../models/Bets')
const Cards = require('../models/Cards')
const config = require('config')
const WhiteListCards = require('../models/WhiteListCards')
const WebSocket = require('ws')

module.exports = async (wss) => {
    try {
        const getCloseAuctions = await Auctions.find({status: true, end_auction: {$lte: Date.now()}})
        if (getCloseAuctions.length <= 0) {
            return;
        }

        for (let auction of getCloseAuctions) {
            auction.status = false
            await auction.save();
        }

        const result = await Promise.all(getCloseAuctions.map(async auction => {
            const cardId = auction.card
            const lastBid = await Bets.findOne({auction: auction._id}, null, {sort: {bet: -1}})

            let user = null
            let owner = null
            if (lastBid) {
                await WhiteListCards({card: cardId}).save()
                const userId = lastBid.user
                owner = await Users.findOne({_id: auction.owner})

                let card = await Cards.findOne({_id: cardId})
                user = await Users.findOne({_id: userId})

                if (owner && user) {
                    switch (owner.role) {
                        case config.get('roles.admin'): {
                            user.cards.push(cardId)

                            const calculateUser = await calculate(user.cards.map(card => card.toString()))
                            user.sets = calculateUser.userSets
                            user.rating = calculateUser.userRating

                            if (!card.is_active) {
                                card.is_active = true
                                await card.save()
                            }

                            await user.save()
                            await auction.save()
                            break;
                        }
                        case config.get('roles.user'): {
                            const findCardIndex = owner.cards.findIndex((card) => card._id === card)
                            owner.cards = owner.cards.filter((_, index) => index !== findCardIndex)

                            user.cards.push(cardId)

                            const calculateOwner = await calculate(owner.cards.map(card => card.toString()))
                            owner.sets = calculateOwner.userSets
                            owner.rating = calculateOwner.userRating
                            owner.balance += lastBid.bet;

                            const calculateUser = await calculate(user.cards.map(card => card.toString()))
                            user.sets = calculateUser.userSets
                            user.balance -= lastBid.bet;
                            user.rating = calculateUser.userRating

                            if (!card.is_active) {
                                card.is_active = true
                                await card.save()
                            }

                            await owner.save();
                            await user.save();
                            break;
                        }
                    }
                }
            }

            return {
                auction: auction._id,
                user,
                owner
            }
        }))

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(result));
            }
        });
    } catch (e) {
        console.log(e)
    }
}
