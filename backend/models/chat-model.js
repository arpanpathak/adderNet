const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  by_id: String,
  to_id: String,
  type: String,
  message: mongoose.Schema.Types.Mixed,
  time: Number,
  read: Boolean
});

module.exports = function(by, from){
  var Chat;
  if(by>from){
    Chat = mongoose.model(from+'chat'+by,chatSchema);
  }
  else{
    Chat = mongoose.model(by+'chat'+from,chatSchema);
  }
  return Chat;
};
