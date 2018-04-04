const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  by: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  type: String,
  message: {
    type: String,
    data: String,
    react: Number
  },
  time: Number,
  read: Boolean,
  showMessage: Boolean
});

Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
