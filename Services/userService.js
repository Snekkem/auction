const Cards = require('../models/Cards')
const ObjectId = require('mongoose').Types.ObjectId
const Locations = require('../models/Locations')
const Episodes = require('../models/Episodes')
const Auctions = require('../models/Auctions')
const Chat = require('../models/Chats')
const Bets = require('../models/Bets')
const Users = require('../models/Users')
const paginationService = require('../helpers/paginationService')
const ResponseError = require("../helpers/ResponseError");

exports.GetCardsInfo = async (pagination, pageNumber) => {
    const count = await Cards.countDocuments({})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const cards = await paginationService(Cards, pageNumber, pagination, ['locations', 'episodes'])

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: cards
        }
    }
}

exports.GetAuctions = async (query = {}) => {
    const {pageNumber, pagination, cardName, selectSum, from, to, episodes, locations} = query
    const count = await Auctions.countDocuments({status: true})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const filter = {}
    if (from && to) {
        filter.min_step_bet = {$gte: from, $lte: to}
    }

    const sortPrice = selectSum && selectSum.toLowerCase() === 'ascending' ? -1 : 1

    const fullAuctionInfo = await Auctions.aggregate([
        {$match: {status: true, ...filter}},
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            }
        },
        {
            $unwind: {
                path: '$owner',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'cards',
                as: 'card',
                let: {card_id: '$card'},
                pipeline: [
                    {
                        $match: {
                            $expr: {$eq: ['$_id', '$$card_id']}
                        },
                    },
                    {
                        $lookup: {
                            from: 'episodes',
                            localField: 'episodes',
                            foreignField: '_id',
                            as: 'episodes'
                        }
                    },
                    {
                        $lookup: {
                            from: 'locations',
                            localField: 'locations',
                            foreignField: '_id',
                            as: 'locations'
                        }
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$card',
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: 'bets',
                as: 'lastBet',
                let: {auction_id: '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {$eq: ['$auction', '$$auction_id']}
                        }
                    },
                    {$sort: {bet: -1}},
                    {$limit: 1}
                ]
            }
        },
        {
            $unwind: {
                path: '$lastBet',
                preserveNullAndEmptyArrays: true,
            },
        },
        {$sort: {'lastBet.bet': sortPrice}},
    ]).skip((parseInt(pageNumber) - 1) * parseInt(pagination)).limit(parseInt(pagination))

    const res = cardName || episodes || locations ? fullAuctionInfo.filter(allInfo => {
        const card = allInfo.card
        const includesCard = card.name.includes(cardName)
        const includesEpisodes = episodes ? card.episodes.filter(episode => {
            return episodes.includes(episode.name)
        }) : []
        const includesLocations = locations ? card.locations.filter(location => locations.includes(location.name)) : []

        const validate = []
        cardName && validate.push(includesCard)
        episodes && validate.push(includesEpisodes.length > 0)
        locations && validate.push(includesLocations.length > 0)

        return validate.reduce((validate, item) => validate ? item : validate, true)
    }) : fullAuctionInfo

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: res
        }
    }
}

exports.GetUserCards = async (id) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    return await Users.findOne({_id: id}).populate('cards').select('cards')
}

exports.GetUserSets = async (id) => {
    return await Users.findOne({_id: id}).populate(['sets', 'sets.isCards.cardId', {
        path: 'sets.setId',
        select: '-set'
    }]).select('sets')
}

exports.GetLocations = async (pagination, pageNumber) => {
    const count = await Locations.countDocuments({})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const locations = await paginationService(Locations, pageNumber, pagination)

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: locations
        }
    }
}

exports.GetEpisodes = async (pagination, pageNumber) => {
    const count = await Episodes.countDocuments({})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const episodes = await paginationService(Episodes, pageNumber, pagination)

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: episodes
        }
    }
}

exports.GetBetHistory = async (userId) => {
    const auctions = await Auctions.find({status: false})

    let lastUserBet = []
    for (const auction of auctions) {
        const lastBet = await Bets.findOne({
            auction: auction._id
        }, null, {sort: {bet: -1}})
            .populate([{path: 'user', select: 'name'},
                {
                    path: 'auction',
                    select: ['owner', 'end_auction'],
                    populate: [{path: 'owner', select: 'name'}, {path: 'card', select: 'name'}]
                },
                {path: 'card', select: 'name'}])

        if (lastBet && (lastBet.user._id == userId || auction.owner == userId)) {
            lastUserBet.push(lastBet)
        }
    }

    return {
        status: 'successful',
        data: lastUserBet
    }
}

exports.GetEpisodeById = async (id) => {
    const episode = await Episodes.findOne({_id: id})

    if (!episode)
        throw new ResponseError(400, 'Location not found!')

    return {
        status: 'successful',
        data: episode
    }
}

exports.PlaceABet = async (auctionId, userId, bet) => {
    const auction = await Auctions.findOne({_id: auctionId})

    if (auction) {
        if (!ObjectId.isValid(auctionId) || !ObjectId.isValid(userId))
            throw new ResponseError(400, 'Id is not valid!')

        if (auction.end_auction < Date.now())
            throw new ResponseError(400, 'Auction ended!')

        if (auction.start_bet > bet)
            throw new ResponseError(400, `The starting bid must be greater than ${auction.start_bet}`)

        const lastBid = await Bets.findOne({auction: auctionId}, null, {sort: {bet: -1}})

        if (bet < auction.min_step_bet)
            throw new ResponseError(400, `Bet must be more than ${auction.min_step_bet}`)

        if (lastBid) {
            if (bet < lastBid.bet + auction.min_step_bet)
                throw new ResponseError(400, `Bid must will be greater than ${lastBid.bet + auction.min_step_bet}`)

            if (auction.max_bet && lastBid.bet >= auction.max_bet)
                throw new ResponseError(400, `The maximum rate has already been set`)
        }

        const futureTime = Date.now() + parseInt(auction.min_extension_time)
        if (new Date(auction.end_auction.toISOString()) <= futureTime) {
            let extension = futureTime - new Date(auction.end_auction.toISOString())
            await Auctions.updateOne({_id: auction._id}, {end_auction: new Date(auction.end_auction.getTime() + extension)})
        }

        const newBet = await Bets({auction: auctionId, user: userId, bet})
        await newBet.save().then(bet => bet.populate({path: 'auction', select: 'end_auction'}).execPopulate())

        return {
            status: 'successful',
            data: newBet
        }
    }
}

exports.Me = async (id) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    const user = await Users.findOne({_id: id})

    return {
        status: 'successful',
        data: {
            name: user.name,
            balance: user.balance,
            rating: user.rating,
            email: user.email,
            countCard: user.cards.length,
            created_at: user.created_at
        }
    }
}

exports.GetUserCards = async (id) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    const user = await Users.findOne({_id: id}).populate('cards')
    return {status: 'successful', data: user}
}

exports.Chat = async () => {
    const chat = await Chat.find().populate('user', '-sets -balance -cards -password -email')
    return {status: 'successful', data: chat}
}

exports.SendMessage = async (userId, message) => {
    let msg = await Chat.create({user: userId, message})
    msg = await msg.populate('user', '-cards -balance -sets -email -password').execPopulate()
    return {status: 'successful', data: msg}
}
