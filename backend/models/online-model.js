const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  id: String,
  socket: String
});

var Online = mongoose.model('online',onlineSchema);

module.exports = Online;
