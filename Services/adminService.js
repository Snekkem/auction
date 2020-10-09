const Cards = require('../models/Cards')
const Users = require('../models/Users')
const Locations = require('../models/Locations')
const Episodes = require('../models/Episodes')
const WhiteListCards = require('../models/WhiteListCards')
const ObjectId = require('mongoose').Types.ObjectId
const Bets = require('../models/Bets')
const Auctions = require('../models/Auctions')
const config = require('config')
const Sets = require('../models/Sets')
const _ = require('lodash')
const ResponseError = require('../helpers/ResponseError')
const paginationService = require('../helpers/paginationService')

exports.GetUsers = async (pageNumber, pagination) => {
    const count = await Users.countDocuments({})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const users = await paginationService(Users, pageNumber, pagination)

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: users
        }
    }
}

exports.UserLock = async (userId) => {
    const user = await Users.findOne({_id: userId})

    user.is_active = !user.is_active

    await user.save()

    return {status: 'successful', data: {userId: user._id, is_active: user.is_active}}
}

exports.GetCardStatistics = async () => {
    const allCards = await Cards.countDocuments()
    const allSets = await Sets.countDocuments()
    const allUsers = await Users.countDocuments()

    return {status: 'successful', data: {Cards: allCards, Sets: allSets, Users: allUsers}}
}

exports.CreateLocation = async (name, type, dimension) => {
    const location = new Locations({name, type, dimension})

    await location.save()
    return {status: 'successful', data: location}
}

exports.DeleteLocations = async (id) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    const location = await Locations.findOne({_id: id})
    await location.deleteOne()
    return {status: 'successful'}
}

exports.UpdateLocation = async (id, dataToUpdate) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    const location = await Locations.findOne({_id: id})
    if (!location)
        throw new ResponseError(400, 'Location not found')

    location.name = dataToUpdate.name.toString()
    location.type = dataToUpdate.type.toString()
    location.dimension = dataToUpdate.dimension.toString()

    await location.save()

    return {status: 'successful', data: location}
}

exports.CreateEpisode = async (name, episode) => {
    const createdEpisode = new Episodes({name, episode})
    await createdEpisode.save()
    return {status: 'successful', data: createdEpisode}

}

exports.DeleteEpisode = async (id) => {
    if (!ObjectId.isValid(id))
        throw new ResponseError(400, 'Id is not valid')

    const episode = await Episodes.findOne({_id: id})
    await episode.deleteOne()

    return {status: 'successful'}
}

exports.UpdateEpisode = async (id, dataToUpdate) => {
    const episode = await Episodes.findOne({_id: id})

    if (!episode)
        throw new ResponseError(400, 'Location not found')

    episode.name = dataToUpdate.name
    episode.episode = dataToUpdate.episode

    await episode.save()

    return {status: 'successful', data: episode}
}

const checkId = async (item) => {
    for await (const l of item) {
        if (!ObjectId.isValid(l)) {
            return 'Id is not valid'
        }
    }
}

exports.CreateCard = async (cardData, image) => {
    const whiteListCards = await WhiteListCards.find().countDocuments()
    const cards = await Cards.find({cardType: 'starter'}).countDocuments()

    if (whiteListCards < cards)
        throw new ResponseError(400, 'Not all cards have been sold yet!')

    let error = await checkId(cardData.locations)
    if (error)
        throw new ResponseError(400, error)

    error = await checkId(cardData.episodes)
    if (error)
        throw new ResponseError(400, error)

    const location = await Locations.find({_id: cardData.locations})
    const episode = await Episodes.find({_id: cardData.episodes})

    if (location.length === 0)
        throw new ResponseError(400, 'Such location is not exists!')

    if (episode.length === 0)
        throw new ResponseError(400, 'Such episodes is not exists!')

    if (!image)
        throw new ResponseError(400, 'Please select a image!')

    const candidate = await Cards.findOne({name: cardData.name})

    if (candidate)
        throw new ResponseError(409, 'Card with such name already exists!')

    const card = await new Cards({
        name: cardData.name,
        status: cardData.status,
        type: cardData.type,
        gender: cardData.gender,
        image: config.get('pathToImage') + image.filename,
        locations: cardData.locations,
        episodes: cardData.episodes,
        cardType: 'custom'
    })

    await card.save()

    return {status: 'successful', data: card}
}

exports.DeleteCard = async (id) => {
    const card = await Cards.findOne({_id: id})
    await card.deleteOne()

    return {status: 'successful'}
}

exports.UpdateCard = async (id, dataToUpdate, imageToUpdate) => {
    const card = await Cards.findOne({_id: id})

    if (!card)
        throw new ResponseError(400, 'Card with such name not found')

    let error
    error = await checkId(dataToUpdate.locations)
    if (error)
        throw new ResponseError(400, error)

    error = await checkId(dataToUpdate.episodes)
    if (error)
        throw new ResponseError(400, error)

    if (dataToUpdate.locations && dataToUpdate.locations.length === 0)
        throw new ResponseError(400, 'Locations not found!')

    if (dataToUpdate.episodes && dataToUpdate.episodes.length === 0)
        throw new ResponseError(400, 'Episodes not found!')

    card.locations = dataToUpdate.locations
    card.episodes = dataToUpdate.episodes
    card.status = dataToUpdate.status
    card.name = dataToUpdate.name
    card.type = dataToUpdate.type
    card.gender = dataToUpdate.gender
    if (imageToUpdate)
        card.image = config.get('pathToImage') + imageToUpdate.filename

    await card.save()

    return {status: 'successful', data: card}
}

exports.GetAuctions = async (pageNumber, pagination) => {
    const count = await Auctions.countDocuments({status: true})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const fullAuctionInfo = await Auctions.aggregate([
        {$match: {status: true}},
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
    ]).skip((parseInt(pageNumber) - 1) * parseInt(pagination)).limit(parseInt(pagination))

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: fullAuctionInfo
        }
    }
}

exports.Auction = async (auctionData) => {
    const {
        start_bet, min_step_bet, max_duration_auctions, min_extension_time, max_bet, status,
        card, owner
    } = auctionData

    if (start_bet <= 0)
        throw new ResponseError(400, 'The starting bid must be greater than 0')

    if (min_step_bet <= 0)
        throw new ResponseError(400, 'The minimum bet step must be greater than 0')

    if (max_bet <= 0)
        throw new ResponseError(400, 'The maximum bid must be greater than 0')

    if (max_bet < start_bet)
        throw new ResponseError(400, 'The maximum bid cannot be less than the starting bind')

    const newAuction = new Auctions({
        start_bet,
        min_step_bet,
        max_duration_auctions,
        min_extension_time,
        max_bet,
        card,
        owner,
        status,
        end_auction: parseInt(max_duration_auctions) + Date.now()
    })

    await newAuction.save()
    return {status: 'successful'}
}

exports.Appointment = async (userId, role) => {
    const user = await Users.findOne({_id: userId})

    user.role = role
    await user.save()

    return {status: 'successful'}
}

exports.GetSets = async (pageNumber, pagination) => {
    const count = await Sets.countDocuments({})
    const maxPage = Math.ceil(count / +pagination)
    const activePage = maxPage >= +pageNumber ? +pageNumber : maxPage

    const sets = await paginationService(Sets, pageNumber, pagination, 'set', '-locations -episodes')

    return {
        status: 'successful',
        data: {
            info: {
                count,
                perPage: pagination,
                currentPage: activePage
            },
            results: sets
        }
    }
}

exports.Pagination = async (pagination, pageNumber) => {
    try {
        const data = await Users.find({})
            .skip((pageNumber - 1) * pagination)
            .limit(pagination)

        return data
    } catch (e) {
        return 'Something went wrong. Try again!'
    }
}

exports.CreateSet = async (set_name, newSet, bonus) => {
    let error
    error = await checkId(newSet)
    if (error)
        throw new ResponseError(400, error)

    const isExistSet = await Sets.findOne({set_name})
    if (isExistSet)
        throw new ResponseError(400, `Set with name ${set_name} already exists`)

    const setList = await Sets.find()

    for await (const setArr of setList) {
        if (setArr.set.length !== newSet.length)
            continue;

        let sa = setArr.set.map(s => s.toString())
        let ns = newSet.map(s => s.toString())

        if (_.isEqual(ns.sort(), sa.sort())) {
            throw new ResponseError(400, 'Set with such cards already exists')
        }
    }

    if (bonus <= 0)
        throw new ResponseError(400, 'The bonus must be greater than 0')

    if (newSet.length <= 1)
        throw new ResponseError(400, 'The set must have greater than 1 card')


    const setToSave = new Sets({set_name, set: newSet, bonus})
    await setToSave.save()

    return {status: 'successful'}
}
