'use strict'
const mongoose = require('mongoose')
const Users = mongoose.model('users')
const { get, hmset, expire } = require('../../token/cache')

exports.login = async function(req, res) {
    res.status(200)
    res.send('ok')
}