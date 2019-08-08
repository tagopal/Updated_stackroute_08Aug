const mongoose = require('mongoose');
const states = require('./states');

let noteschema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
  state: {
    type: String,
    enum:states,
    default:'not-started'
  },
  userId: {
    type: String
  },
  createdOn: {
    type: String,
    default:Date.now
  },
  modifiedOn: {
    type: String,
    default:Date.now
  }
});

module.exports = mongoose.model('notes', noteschema);
