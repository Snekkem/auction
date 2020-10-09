const express = require('express')
const authController = require('./../Controllers/authController')
const authRouter = express.Router()
const {check} = require('express-validator')

authRouter.post('/register', [
    check('name','Length of name must will be more than 2 symbols').isLength({min: 2}),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Length of password must will be more than 6 symbols').isLength({min: 6})
], authController.Register)

authRouter.post('/login', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Length of password must will be more than 6 symbols').isLength({min: 6})
], authController.Login)

module.exports = authRouter;