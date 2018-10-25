'use strict'

module.exports = function(app) {
    let users = require('../controllers/usersController')
    app.route('/login')
        .post(users.login)

}