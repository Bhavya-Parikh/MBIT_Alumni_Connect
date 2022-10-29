//Controller
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
//Middlewares
const guest = require('../app/http/middlewares/guest')


function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest ,authController().login)
}

module.exports = initRoutes