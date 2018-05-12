const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  type: { type: String, default: "plain"} ,
  date: { type: Date, default: Date.now }, // stores timestamp ..
  data: String,
  react: { type: String, default: null },
  status : { type: String, default: 'sending' }, // status codes: [sending,sent,read,reacted]
  showMessage: { type: Boolean, default: true }
});

const conversationSchema = new mongoose.Schema({
   // id format fromUserId_toUserId if fromUserId<toUserId ..
   _id: {type: String}, 
   messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
});

module.exports = {
  Message: mongoose.model('Message', messageSchema), // exporting Message model..,
  Conversation: mongoose.model('Conversation',conversationSchema)
}
