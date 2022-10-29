const Students = require('../../models/student')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return {
    login(req, res) {
        res.render('login')
    }
}
}
module.exports = authController