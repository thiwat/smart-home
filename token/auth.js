'use strict'

const hash = require('./hash')
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY'
const { hgetall } = require('./cache')

exports.checkKey = function(req, res, next) {
    const secretKey = req.header('secretKey')
    if (secretKey !== SECRET_KEY) {
        res.status(401).json({message: "Wrong secret key"})
        return
    }
    next()
}

exports.checkRefreshToken = function(roles=['admin']) {
    return async function(req, res, next) {
        const refreshToken = req.header('refreshToken')
        const token = await hgetall(refreshToken)
        if (!token) {
            res.status(401).json({ message: "Session Expired"})
            return
        }
        const { role } = token
        if (!roles.includes(role)) {
            res.status(401).json({ message: "No permission"})
        }
        next()
    }
}