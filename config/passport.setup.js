const passport = require("passport")
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

// import userModel
const userModel = require('../models/user.module')
passport.use(new localStrategy(
    {
        usernameField: 'email'
    }, 
    ( email, password, done) => {
        // find user
        userModel.findOne({ email: email})
            .then((user) => {
                if(!user){
                    done(null, false)
                }
                else{
                    // now if we found user
                    bcrypt.compare(password, user.password, (err, matched) => {
                        if(err){
                            console.log(err)
                            done(err, false, { message: `Something went wrong.`})
                        }
                        else{
                            // password matched
                            if(matched){
                                done(null, user, {message: `Welcome to WebMeet.`})
                            }
                            // password didn't match
                            else{
                                done(null, false, {message: `Wrong password.`})
                            }
                        }
                    })
                }
            })
            .catch((err) => {
                if(err){
                    console.log(err)
                    done(err, false, { message: `Something went wrong.`})
                }
            })

    }
))

// serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    userModel.findById(id)
    .then((user) => {
        done(null, user)
    })
})