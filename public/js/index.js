var socket = io();
socket.on('connect',() =>{
  console.log('Connected to server');

socket.emit('createMessage',{
  from : 'bunkuboy@gmail.com',
  text : 'hello bunkuboy'
})
})

socket.on('disconnect',() =>{
  console.log('Disconnected from server');
})

socket.on('newMessage',(message) =>{
  console.log('newMessage',message);
})
