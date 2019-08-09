function bootstrapSocketServer(io) {
    io.on('connection', (socket) => {
		// User Registration
        socket.on('register', function(data) {
			if(data.username.length > 0) {
				socket.emit('welcomeMessage', `Welcome ${data.username} !!`);
				data.channels.forEach(channel => {
                    socket.join(channel);
					socket.emit('addedToChannel', { channel: channel });
				});
            }
            // Add Channel
            socket.on('joinChannel', function(joinRequest) {
                socket.join(joinRequest.channel);
                socket.emit('addedToChannel', joinRequest);
            });
            // Remove Channel
            socket.on('leaveChannel', function(leaveRequest) {
                socket.leave(leaveRequest.channel);
                socket.emit('removedFromChannel', leaveRequest);
            });
        });
        // New Message
        socket.on('message', function(data) {
            socket.to(data.channel).emit('newMessage', data);
        });
    });
}

module.exports = bootstrapSocketServer;
