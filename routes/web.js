//Controller
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const userController = require('../app/http/controllers/userController')
//Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')

function initRoutes(app){
    app.get('/',homeController().index)
    
    //login
    app.get('/login',guest ,authController().login)
    app.post('/login',authController().postLogin)

    //register
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)

    //logout
    app.post('/logout', authController().logout)

    /////////////////////////////////////////////////

    app.get('/tell-us-more',auth,userController().moreinfo)
}

module.exports = initRoutes