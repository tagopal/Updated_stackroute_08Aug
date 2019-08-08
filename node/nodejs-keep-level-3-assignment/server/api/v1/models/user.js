const mongoose = require('mongoose');

let userschema = new mongoose.Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('user', userschema);
