var socket = io();

socket.on('connect',() =>{
  console.log('Connected to server');
})

socket.on('disconnect',() =>{
  console.log('Disconnected from server');
})

socket.on('newMessage',(message) =>{
  console.log('newMessage',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
})

socket.emit('createMessage',{
  from : 'abc@gmail.com',
  text : 'hello'
}, () =>{
  console.log('Got it');
})

jQuery('#message-form').on('submit',(e) =>{
  e.preventDefault();

  socket.emit('createMessage',{
    from : 'User',
    text : jQuery('[name=message]').val()
  }, function() {

  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',() =>{
  if(!navigator.geolocation){
    return alert('geolocation not support by browser');
  }
  navigator.geolocation.getCurrentPosition((position) =>{
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude : position.coords.longitude
    })
  },() =>{
    alert('Unable to fetch location');
  })
})
