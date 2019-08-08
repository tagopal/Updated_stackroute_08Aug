//mock client side
const socket = require('socket.io-client')('http://localhost:3000');
  socket.on('connect', function(){
  });

  socket.emit('register', {username:'vignesh',channels:['test']});

  socket.on('welcomeMessage',(data)=>{
  })

  socket.on('addedToChannel',(data)=>{
  })

  socket.on('message',(data)=>{
  })