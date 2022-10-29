const LocalStrategy = require('passport-local').Strategy
const Student = require('../models/student')
const bcrypt = require('bcrypt')
const { message } = require('laravel-mix/src/Log')
 
function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},async (email,password,done)=>{
        const student = await Student.findOne({email:email})
        if(!student){
            return done(null,false,{message: 'No user with this email'})
        }

        bcrypt.compare(password,student.password).then(match=>{
            if(match){
                return done(null,student,{message:'Logged in successfully'})
            }
            return done(null,false,{message:'Wrong email/password'})
        }).catch(err=>{
            return done(null,false,{message: 'Something went wrong'})
        })
    }))

    passport.serializeUser((student,done)=>{
        done(null,student._id)
    })

    passport.deserializeUser((id,done)=>{
        Student.findById(id,(err,student)=>{
            done(err,student)
        })
    })
}

module.exports = init