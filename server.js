require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const body = require('body-parser')
const mongoose = require('mongoose')

app.use(body.urlencoded({ extended: true }))
app.use(body.json())

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/myapp`, { useNewUrlParser: true })
require('./api/models/usersModel')

const userRoutes = require('./api/routes/usersRoute')
userRoutes(app)

app.listen(port)