const {validationResult} = require("express-validator");
const adminService = require('../Services/adminService')
const config = require('config')

exports.GetUsers = async (req, res, next) => {
    try {
        res.send(await adminService.GetUsers(req.query.pageNumber, req.query.pagination))
    } catch (ex) {
        next(ex)
    }
}

exports.UserLock = async (req, res, next) => {
    try {
        const {userId} = req.body
        res.send(await adminService.UserLock(userId))
    } catch (ex) {
        next(ex)
    }
}

exports.GetCardStatistics = async (req, res, next) => {
    try {
        res.send(await adminService.GetCardStatistics())
    } catch (ex) {
        next(ex)
    }
}

exports.CreateLocation = async (req, res, next) => {
    try {
        const {name, type, dimension} = req.body
        res.send(await adminService.CreateLocation(name, type, dimension))
    } catch (ex) {
        next(ex)
    }
}

exports.DeleteLocations = async (req, res, next) => {
    try {
        res.send(await adminService.DeleteLocations(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.UpdateLocation = async (req, res, next) => {
    try {
        res.send(await adminService.UpdateLocation(req.params.id, req.body.dataToUpdate))
    } catch (ex) {
        next(ex)
    }
}

exports.DeleteCard = async (req, res, next) => {
    try {
        res.send(await adminService.DeleteCard(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.UpdateCard = async (req, res, next) => {
    try {
        res.send(await adminService.UpdateCard(req.params.id, req.body, req.file))
    } catch (ex) {
        next(ex)
    }
}

exports.CreateEpisode = async (req, res, next) => {
    try {
        const {name, episode} = req.body
        res.send(await adminService.CreateEpisode(name, episode))
    } catch (ex) {
        next(ex)
    }
}

exports.DeleteEpisode = async (req, res, next) => {
    try {
        res.send(await adminService.DeleteEpisode(req.params.id))
    } catch (ex) {
        next(ex)
    }
}

exports.UpdateEpisode = async (req, res, next) => {
    try {
        res.send(await adminService.UpdateEpisode(req.params.id, req.body.dataToUpdate))
    } catch (ex) {
        next(ex)
    }
}

exports.Appointment = async (req, res, next) => {
    try {
        const {userId, role} = req.body
        res.send(await adminService.Appointment(userId, role))
    } catch (ex) {
        next(ex)
    }
}

exports.CreateSet = async (req, res, next) => {
    try {
        const {set_name, set, bonus} = req.body
        res.send(await adminService.CreateSet(set_name, set, bonus))
    } catch (ex) {
        next(ex)
    }
}

exports.GetSets = async (req, res, next) => {
    try {
        res.send(await adminService.GetSets(req.query.pageNumber, req.query.pagination))
    } catch (ex) {
        next(ex)
    }
}

exports.Pagination = (req, res) => {
    const pagination = req.body.pagination ? parseInt(req.body.pagination) : config.get('pagination_per_page');
    const pageNumber = req.body.page ? parseInt(req.body.page) : config.get('pagination_initial_page');
    adminService.Pagination(pagination, pageNumber).then(info => res.send(info))
}

exports.GetAuctions = async (req, res, next) => {
    try {
        res.send(await adminService.GetAuctions(req.query.pageNumber, req.query.pagination))
    } catch (ex) {
        next(ex)
    }
}

exports.Auction = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }

    try {
        res.send(await adminService.Auction({...req.body, owner: req.user.id})).status(201)
    } catch (ex) {
        next(ex)
    }
}

exports.CreateCard = async (req, res, next) => {
    try {
        res.send(await adminService.CreateCard(req.body, req.file)).status(201)
    } catch (ex) {
        next(ex)
    }
}
