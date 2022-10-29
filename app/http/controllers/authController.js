const s = require('../../models/student')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return {
    login(req, res) {
        res.render('auth/login')
    }
}
}
module.exports = authController