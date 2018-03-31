const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date_created: { type: Date  },
  userid: mongoose.Schema.Types.ObjectId,
  username: String,
  email: { type:String, unique: false},
  phone: String,
  password: String,

  // personal information....
  name: String,
  gender: String,
  googleId: { type:String, unique: false},
  fbId: { type:String, unique: false},
  profilePic: String, // static url of profile pic
  coverPic: String,  // static url of cover pic

  // social information ....
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests_send: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  shares: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  messages: [ { from: String, time: { type: Date, default: Date.now } }]

});

var User = mongoose.model('user',userSchema);

module.exports = User;
