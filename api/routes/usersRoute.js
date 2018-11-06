'use strict'

const { checkKey, checkRefreshToken } = require('../../token/auth')

module.exports = function(app) {
    const users = require('../controllers/usersController')
    app.route('/login')
        .post(checkKey, users.login)

    app.route('/register')
        .post(checkKey, users.register)

    app.route('/check')
        .get(checkKey, checkRefreshToken(), function(req, res) {
            res.json({ message: "Success"})
        })

}