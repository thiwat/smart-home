'use strict'

const { checkKey } = require('../../token/auth')

module.exports = function(app) {
    const users = require('../controllers/usersController')
    app.route('/login')
        .post(checkKey, users.login)

    app.route('/register')
        .post(checkKey, users.register)

}