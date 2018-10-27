'use strict'

module.exports = function(app) {
    const users = require('../controllers/usersController')
    app.route('/login')
        .post(users.login)

}