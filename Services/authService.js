const Users = require('./../models/Users')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const keys = require('./../vercel.json')
const calculate = require('../helpers/calculateRating')
const ResponseError = require('../helpers/ResponseError')

exports.Register = async (name, email, password) => {
    const candidate = await Users.findOne({email})

    if (candidate)
        throw new ResponseError(409, 'User with such email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new Users({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        role: config.get('roles.user')
    })

    await user.save()

    return 'Successful'
}

exports.Login = async (email, password) => {
    const user = await Users.findOne({email})

    if (!user)
        throw new ResponseError(403, 'Wrong email or password!')

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword)
        throw new ResponseError(403, 'Wrong email or password!')

    if (!user.is_active)
        throw new ResponseError(403, 'Account blocked!')

    const calculateUser = await calculate(user.cards.map(card => card.toString()))
    user.sets = calculateUser.userSets
    user.rating = calculateUser.userRating
    await user.save()

    const token = jwt.sign({
        id: user._id, name: user.name, role: user.role
    }, keys.env.SECRET, {expiresIn: '1h'})

    return {token, userId: user._id, role: user.role}
}
