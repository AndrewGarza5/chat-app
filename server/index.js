const port = 5000 
const express = require('express')
const path = require('path')
const {Server} = require('socket.io')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

const pool = require('./db/connect')

const app = express()
const https = require('https')
const http = require('http')

const crypto = require('crypto');
const { randomUUID } = require('crypto');

const ChatBox = require('./routes/ChatBox.js')
const ChatMessage = require('./routes/ChatMessage.js')
const ChatEmote = require('./routes/ChatEmote.js')


// var httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/asuguesser.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/asuguesser.com/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/asuguesser.com/chain.pem')
// };

// const httpsServer = https.createServer(httpsOptions, app)
const httpServer = http.createServer(app)

// ****** CHANGE TO HTTPS ***************
const io = require("socket.io")(httpServer, {
    cors: {
      //origin: "https://www.asuguesser.com",
      origin: "*",
      methods: ["GET", "POST"] 
    }
});

// middleware 
// const corsOptions = {
//     origin: 'http://54.67.65.70/'
// }
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/chatbox', ChatBox)
app.use('/api/v1/emote', ChatEmote)
app.use('/api/v1/chatbox/:chatBoxId/chat', ChatMessage)


// test endpoint
app.get('/test', async (req,res) => {
    console.log('!!!')
})
 
// Socket io
const chatSocket = require('./socketio/ChatSocket.js')
const globalEventsSocket = require('./socketio/globalEventsSocket.js')

const onConnection = (socket) => {
    const roomJoin = socket.handshake.query.chatRoomName
    console.log(socket.id)
    socket.join(roomJoin)
    
    chatSocket(io, socket)
    globalEventsSocket(io, socket) 
}
io.on("connection", onConnection) 


// start server
const start = async () => {
    try{
        
        httpServer.listen(port,()=>{
            console.log(`HTTP server listening on port ${port}...`)
        })

        // httpsServer.listen(5001, ()=>{
        //     console.log('HTTPS server listening on port 5001...')
        // })

    }
    catch(error){
        console.log(error)
    }
}

start()