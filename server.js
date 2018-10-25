const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const body = require('body-parser')
const mongoose = require('mongoose')

app.use(body.urlencoded({ extended: true }))
app.use(body.json())

mongoose.connect('mongodb://localHost/smartHome', { useNewUrlParser: true })
require('./api/models/usersModel')

let userRoutes = require('./api/routes/usersRoute')
userRoutes(app)

app.listen(port)