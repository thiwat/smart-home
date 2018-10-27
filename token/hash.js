'use strict'
const crypto = require('crypto')
const PRIVATE_KEY = process.env.SECRET_KEY || 'SECRET_KEY'
const SALT = process.env.SALT || 'SALT'

function hmac(message) {
    return crypto.createHmac('sha1', PRIVATE_KEY).update(message).digest('hex')
}

exports.salt = function(username) {
    let timeStamp = Math.floor( new Date() )
    let message = `${timeStamp}${SALT}${username}`
    return hmac(message)
}

exports.password = function(password, salt) {
    let message = `${password}${SALT}${salt}`
}