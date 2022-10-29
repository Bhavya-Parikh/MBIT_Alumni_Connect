const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
const bodyParser = require('body-parser');


//Database connection 
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

//Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie:{maxAge:1000*60*60}

}))

//Passport config
const passportInit = require('./app/config/passport')
const certController = require('./app/http/controllers/certController')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
//app.use(express.json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Global Middlewares
app.use((req,res,next) =>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
} )




//Set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//routes
require('./routes/web')(app)

app.listen(PORT , () => {
    console.log(`Listening on PORT ${PORT}`)
})