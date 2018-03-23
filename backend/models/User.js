const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  userid: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  name: String,
  googleId: String,
  fbId: String,
  friends: Array,
  profilePic: String,
  coverPic: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  shares: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  messages: [ { from: String, time: { type: Date, default: Date.now }, }]
});

var User = mongoose.model('user',userSchema);

module.exports = User;
