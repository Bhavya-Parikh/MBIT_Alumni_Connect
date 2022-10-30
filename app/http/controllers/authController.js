const Student = require('../../models/student')
const bcrypt = require('bcrypt')
const passport = require('passport')
const student = require('../../models/student')

function authController(){
    return {
    login(req, res) {
        res.render('auth/login')
    },
    postLogin(req, res, next) {
        const { email, password }   = req.body
       // Validate request 
        if(!email || !password) {
            req.flash('error', 'All fields are required')
            return res.redirect('/login')
        }
        passport.authenticate('local', (err, agent, info) => {
            if(err) {
                req.flash('error', info.message )
                return next(err)
            }
            if(!student) {
                req.flash('error', info.message )
                return res.redirect('/login')
            }
            req.logIn(student, (err) => {
                if(err) {
                    req.flash('error', info.message ) 
                    return next(err)
                }

                return res.redirect('/')
            })
        })(req, res, next)

    }, register(req, res) {
        res.render('auth/register')
    },
    async postRegister(req, res) {
     const { rollno,name,joining_year,graduation_year, email, password }   = req.body
     // Validate request 
     if(!name || !email || !password || !rollno || !joining_year || !graduation_year ) {
         req.flash('error', 'All fields are required')
         req.flash('name', name)
         req.flash('email', email)
         req.flash('password', password)
         req.flash('rollno', rollno)
         req.flash('joining_year', joining_year)
         req.flash('graduation_year', graduation_year)
        return res.redirect('/register')
     }

     // Check if email exists 
    Student.exists({ email: email }, (err, result) => {
         if(result) {
            req.flash('error', 'Email already taken')
            req.flash('name', name)
            req.flash('email', email) 
            req.flash('password', password)
            req.flash('rollno', rollno)
            req.flash('joining_year', joining_year)
            req.flash('graduation_year', graduation_year)
            return res.redirect('/register')
         }
     })

     // Hash password 
     const hashedPassword = await bcrypt.hash(password, 10)
     // Create a user 
     const student = new Student({
         name,
         email,
         password: hashedPassword,
         rollno,
         joining_year,
         graduation_year
     })

     student.save().then((student) => {
        // Login
        return res.redirect('/')
     }).catch(err => {
        req.flash('error', 'Something went wrong')
            return res.redirect('/register')
     })
    },logout(req, res) {
        req.logout()
        return res.redirect('/login')  
      }
}
}
module.exports = authController