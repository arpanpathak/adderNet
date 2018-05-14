const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  socket: String
});

var Online = mongoose.model('online',onlineSchema);

module.exports = Online;
