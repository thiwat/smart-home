'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let usersSchema = new Schema ({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('users', usersSchema)