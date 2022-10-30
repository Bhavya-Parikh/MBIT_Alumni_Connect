const Student = require('../../models/student')
const student = require('../../models/student')
const bcrypt = require('bcrypt')
const passport = require('passport')

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
        passport.authenticate('local', (err, student, info) => {
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

                return res.redirect('tell-us-more')
            })
        })(req, res, next)

    }, register(req, res) {
        res.render('auth/register')
    },
    async postRegister(req, res) {
     const { rollno,firstname,lastname,joining_year,graduation_year, email, password }   = req.body
     // Validate request 
     if(!firstname || !lastname || !email || !password || !rollno || !joining_year || !graduation_year ) {
         req.flash('error', 'All fields are required')
         req.flash('firstname', firstname)
         req.flash('lastname', lastname)
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
            req.flash('firstname', firstname)
            req.flash('lastname', lastname)
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
         firstname,
         lastname,
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
    },logout(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/login');
        });
      }
}
}
module.exports = authController