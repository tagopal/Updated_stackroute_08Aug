var should = require('should');
const expect = require('chai').expect;
const socket = require('socket.io-client')('http://localhost:3000');

describe('Socket Client', () => {

  it('register and join channel', (done) => {

    socket.emit('register', { username: 'vignesh', channels: ['test'] });

    socket.on('welcomeMessage', (data) => {
      // console.log("Inside welcomeMessage on  :",data);
      should.exists(data);
      done();
    })
  });
});