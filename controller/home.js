const router = require('express').Router()
const { ensureAuthentication } = require('../config/gourd')
const { v4: uuidV4 } = require('uuid')

// create a defualt route(GET)
router.get('/', ensureAuthentication ,(req, res) => {
    res.render('home', {
        user: req.user, 
        authenticated: req.isAuthenticated(),
        roomId: uuidV4()
    })
})

// get route for enter room
router.get('/room/:roomId', ensureAuthentication ,(req, res) => {
    res.render('room', {
        roomId: req.params.roomId, 
        authenticated: req.isAuthenticated(),
        user: req.user,
    })
})


// post route for getting join room id
router.post('/join', (req, res) => {
    let roomId = req.body.roomId
    req.flash(
        'success_msg',
        `You have joined room of id ${roomId}.`
    )
    res.redirect(`/home/room/${roomId}`)
})

module.exports = router