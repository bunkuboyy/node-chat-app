const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var {messageGenerator} = require('./utils/message.js');

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) =>{
  console.log('new user connected');

  socket.emit('newMessage',messageGenerator('Admin','Hello bunkuboy'));

  socket.broadcast.emit('newMessage',messageGenerator('Admin','New user joined'));

socket.on('createMessage',(message,callback) =>{
  console.log(message);
  io.emit('newMessage',messageGenerator(message.from,message.text));
  callback('This if from bunku');
})

socket.on('createLocationMessage',(coords) =>{
  io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
})

socket.on('disconnect',() =>{
    console.log('User disconnected');
  })
})

server.listen(port,() =>{
  console.log(`Server is up on port ${port}`);
})
