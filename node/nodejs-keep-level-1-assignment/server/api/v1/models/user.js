const mongoose = require('mongoose');

let userschema = new mongoose.Schema({
  userName: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model('user', userschema);
