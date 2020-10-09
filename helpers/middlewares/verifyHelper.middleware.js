const jwt = require('jsonwebtoken')
const secret = require('../../vercel.json').env.SECRET

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({ message: 'No authorization' })
        }

        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'No authorization' })
    }
}