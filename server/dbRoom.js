const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room: String,
  messages: [],
});

module.exports = mongoose.model('Room', roomSchema);
