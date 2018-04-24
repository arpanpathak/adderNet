const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  by: mongoose.Schema.Types.ObjectId,
  to: mongoose.Schema.Types.ObjectId,
  type: { type: String, default: "plain"} ,
  data: String,
  react: { type: String, default: null },
  time: Date,
  status : { type: String, default: 'sending' }, // status codes: [sending,sent,read,reacted]
  showMessage: Boolean
});

const Conversation = new mongoose.Schema({
   // id format fromUserId_toUserId if fromUserId<toUserId ..

   id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],

});

module.exports = {
  Message: mongoose.model('Message', messageSchema) // exporting Message model..

}
