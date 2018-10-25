'use strict'
const mongoose = require('mongoose')
const Users = mongoose.model('users')
const { get, hmset, expire } = require('../../token/cache')

exports.login = async function(req, res) {
    // let result = await Users.find({username: "0625645141", password: "123123"})
    // console.log(result)
    // let result = await get('test')
    let result = await hmset('token_id', {name: "Thiwat", role: "admin"})
    await expire('token_id', 20)
    console.log(result)
    res.status(200)
    res.send('ok')
}