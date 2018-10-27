'use strict'

const hash = require('./hash')
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY'

exports.checkKey = function(req, res, next) {
    const secretKey = req.header('secretKey')
    if (secretKey !== SECRET_KEY) {
        res.status(401).json({message: "Wrong secret key"})
        return
    }
    next()
}