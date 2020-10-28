// importing modules
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const ejsLayout = require('express-ejs-layouts')
const path = require("path")
const passport = require('passport')
const cookieSession = require('cookie-session')
const session = require('express-session')
const flash = require('connect-flash')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})




// passport setpup
const passportSetup = require('./config/passport.setup')

// import routes
const userRouter = require('./controller/user')
const homeRouter = require('./controller/home')

// config dotenv
dotenv.config()

// define PORT
const PORT = process.env.PORT || 3000



// set EJS
app.set('view engine', 'ejs')
app.use(ejsLayout)

// set static dir
app.use("/public", express.static(path.join(__dirname, "static")))

// urlencoded
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// connect mongo
require('./config/db')


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
)

// connect-flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// passport init
app.use(passport.initialize())
app.use(passport.session())

// peerjs setup
app.use('/peerjs', peerServer)

// middlewares for routers
app.get('/',(req, res) => {
    res.render('welcome')
})
app.use('/user', userRouter)
app.use('/home', homeRouter)

// sockets events
io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('new-member', roomId, userId)
        var rooms= io.sockets.adapter.rooms[roomId];
        socket.emit('member', roomId, rooms, userId)
    
    })
    
})

// route for error file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'error.html'))
})


// server starting
server.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(`Server is started on port ${PORT}`)
    }
}) 