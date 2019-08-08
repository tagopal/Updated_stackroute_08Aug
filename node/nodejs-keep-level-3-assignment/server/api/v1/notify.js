function bootstrapSocketServer(io) {
    //console.log(io);
    //server side
    io.on('connection', (socket) => {
        socket.on('register', (obj) => {
            socket.emit('welcomeMessage', `Welcome ${obj.username} !!`);
            socket.join(obj.channels);
            socket.emit('addedToChannel', obj.channels);           
        });
        socket.on('message', (obj) => {
            socket.to(obj.channel).emit('newMessage', obj);
        });
    });
}

module.exports = bootstrapSocketServer;
