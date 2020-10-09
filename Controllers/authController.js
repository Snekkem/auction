const authService = require('./../Services/authService')
const {validationResult} = require('express-validator')

exports.Register = async (req, res, next) => {
    const {name, email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }

    try {
        res.send(await authService.Register(name, email, password))
    } catch (ex) {
        next(ex)
    }
}

exports.Login = async (req, res, next) => {
    const {email, password} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Incorrect data'
        })
    }

    try {
        res.send(await authService.Login(email, password))
    } catch (ex) {
        next(ex)
    }
}
