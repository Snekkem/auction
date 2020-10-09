const userService = require('./../Services/userService')

exports.GetCardsInfo = async (req, res, next) => {
    try {
        res.send(await userService.GetCardsInfo(req.query.pagination, req.query.pageNumber))
    } catch (ex) {
        next(ex)
    }
}

exports.GetUserSets = async (req, res, next) => {
    try {
        res.send(await userService.GetUserSets(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.GetAuctions = async (req, res, next) => {
    try {
        res.send(await userService.GetAuctions(req.query))
    } catch (ex) {
        next(ex)
    }
}

exports.GetBetHistory = async (req, res, next) => {
    try {
        res.send(await userService.GetBetHistory(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.GetLocations = async (req, res, next) => {
    try {
        res.send(await userService.GetLocations(req.query.pagination, req.query.pageNumber))
    } catch (ex) {
        next(ex)
    }
}

exports.GetEpisodes = async (req, res, next) => {
    try {
        res.send(await userService.GetEpisodes(req.query.pagination, req.query.pageNumber))
    } catch (ex) {
        next(ex)
    }
}

exports.PlaceABet = async (req, res, next) => {
    try {
        const {auction, user, bet} = req.body
        res.send(await userService.PlaceABet(auction, user, bet))
    } catch (ex) {
        next(ex)
    }
}

exports.GetUserCards = async (req, res, next) => {
    try {
        res.send(await userService.GetUserCards(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.Me = async (req, res, next) => {
    try {
        res.send(await userService.Me(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.Chat = async (req, res, next) => {
    try {
        res.send(await userService.Chat())
    } catch (ex) {
        next(ex)
    }
}

exports.SendMessage = async (req, res, next) => {
    try {
        res.send(await userService.SendMessage(req.body.userId, req.body.message))
    } catch (ex) {
        next(ex)
    }
}

