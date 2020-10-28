const router = require('express').Router()
const { registerValidator, loginValidator } = require('../config/validate.user')
const userModel = require('../models/user.module')
const password = require('passport')
const { forwordAuthentication } = require('../config/gourd')
const bcrypt = require("bcryptjs")

// get route for register page
router.get('/register', forwordAuthentication ,(req, res) => {
    res.render('register', {
        user : new userModel(),
        authenticated: req.isAuthenticated()
    })
})

// post method for register route
router.post('/register', async (req, res) => {
    let errors = []
    
    // joi validation
    const validator = registerValidator.validate(req.body)
    if(validator.error){
        errors.push({"msg": validator.error.details[0].message})
    }
    
    // check for existing email
    const user = await userModel.findOne({ email : req.body.email })
    if(user){
        errors.push({"msg": `${user.email} is already registerd.`})
    }

    // if any error occured
    if(errors.length > 0){
        res.render('register', {
            user: req.body, 
            errors, 
            authenticated: req.isAuthenticated()
        })
    }
    else{
        
        // password hashing
        const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(req.body.password, salt)

        // saving to database
        const new_user = new userModel(
            {
                name: req.body.name, 
                email: req.body.email, 
                password: hashed_password, 
            }
        )
        new_user.save()
            .then((user) => {
                req.flash({
                    'msg': `You are logged in ${user.name}`
                })
                console.log(`${user.email} is saved to DB`)})
            .catch((err) => {console.log(err)})
        res.render('login', {
            user: req.body, 
            message: `Now you can logIn, ${req.body.name}`,
            authenticated: req.isAuthenticated()
        })
    }
    
})

// get route for login page
router.get("/login", forwordAuthentication ,(req, res) => {
    res.render('login', {
        user: req.body, 
        authenticated: req.isAuthenticated()
    })
})


// post route for login 
router.post('/login', password.authenticate('local', {
    successRedirect: '/home', 
    failureRedirect: '/user/login',
    successFlash: true,
    successMessage: 'Welcome to WebMeet.', 
    failureFlash: true
}))

// for logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash(
        'success_msg',
        'You are logged Out'
    )
    res.redirect('/user/login')
})
module.exports = router