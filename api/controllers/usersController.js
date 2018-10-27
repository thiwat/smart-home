'use strict'
const mongoose = require('mongoose')
const Users = mongoose.model('users')
const { hmset, expire } = require('../../token/cache')
const hash = require('../../token/hash')

exports.login = async function(req, res) {
    let userInput = req.body

    try {
        var result = await Users.find({ username: userInput.username })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Out of service" })
        return
    }

    if (result.length !== 1) {
        res.status(404).json({ message: "User not found" })
        return
    }

    const user = result[0]
    const [password, salt] = user.password.split(':')
    if(hash.password(userInput.password, salt) !== password) {
        res.status(401).json({ message: "Wrong password" })
        return
    }
    
    const refreshToken = hash.hmac(userInput.username)
    const expireTime = 14 * 24 * 60 * 60 // 14 days
    await hmset(refreshToken, {name: user.name, role: user.role})
    await expire(refreshToken, expireTime) 

    res.json({ message: "Success", refreshToken })
}

exports.register = async function(req, res) {
    let user = new Users(req.body)
    
    try {
        var checkExist = await Users.find({ username: user.username }).countDocuments()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Out of service" })
        return
    }

    if (checkExist !== 0) {
        res.status(400).json({ message: "This username is already exist"})
        return
    }

    const salt = hash.salt(user.username)
    const password = hash.password(user.password, salt)
    const storePassword = `${password}:${salt}`

    user.password = storePassword

    try {
        await user.save()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Out of service "})
        return
    }
    
    res.json({ message: "Register success."})
}