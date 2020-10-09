const Users = require('../../models/Users')
const jwt = require('jsonwebtoken')
const secret = require('../../vercel.json').env.SECRET
const config = require('config')

module.exports = isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret)

        const user = await Users.findOne({email: decoded.email})

        if (user && user.role !== config.get('roles.admin')) {
            return res.send('You are not admin')
        }

        next()
    } catch (e) {
        return res.json(e.message)
    }
}