const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(express.static(path.resolve('./public')));

const io = new Server(server);

io.on("connection",(socket)=>{
    // console.log(`New user has connected ${socket.id}`);
    socket.on("user-message", (message)=>{
        // console.log(`A new user message : ${message}`);
        io.emit("user-message",message,socket.id);
    })
})


app.get('/',(req,res)=>{
    res.sendFile('/public/index.html');
})

server.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});