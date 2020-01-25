const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) =>{
  console.log('new user connected');

  socket.emit('newMessage',{
    from : 'tushu@gmail.com',
    text : 'bhagbc',
    createdAt : 1234
  })

socket.on('createMessage',(message) =>{
  console.log(message);
})
  socket.on('disconnect',() =>{
    console.log('User disconnected');
  })
})

server.listen(port,() =>{
  console.log(`Server is up on port ${port}`);
})
