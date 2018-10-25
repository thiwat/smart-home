'use strict'
const mongoose = require('mongoose')
const Users = mongoose.model('users')

exports.login = async function(req, res) {
    let result = await Users.find({username: "0625645141", password: "123123"})
    console.log(result)
    res.status(200)
    res.send('ok')
}