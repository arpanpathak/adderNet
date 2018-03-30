const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date_created: { type: Date  },
  userid: mongoose.Schema.Types.ObjectId,
  username: String,
  email: { type:String, unique: true},
  phone: String,
  password: String,
  name: String,
  googleId: { type:String, unique: true},
  fbId: { type:String, unique: true},
  profilePic: String, // static url of profile pic
  coverPic: String,  // static url of cover pic
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  shares: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  messages: [ { from: String, time: { type: Date, default: Date.now } }]
});

var User = mongoose.model('user',userSchema);

module.exports = User;
