const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  type: { type: String, default: "plain"} ,
  data: Date, // stores timestamp ..
  react: { type: String, default: null },
  status : { type: String, default: 'sending' }, // status codes: [sending,sent,read,reacted]
  showMessage: Boolean
});

const conversationSchema = new mongoose.Schema({
   // id format fromUserId_toUserId if fromUserId<toUserId ..
   id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
});

module.exports = {
  Message: mongoose.model('Message', messageSchema), // exporting Message model..,
  Conversation: mongoose.model('Conversation',conversationSchema)
}
