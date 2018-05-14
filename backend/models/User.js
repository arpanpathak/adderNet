const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  date_created: { type: Date  },
  userid: mongoose.Schema.Types.ObjectId,
  username: String,
  email: { type:String, unique: true },
  googleId: { type:String, unique: true},
  fbId: { type:String, unique: true},
  aadharNo: { type: String},
  phone: String,
  password: String,

  // personal information....
  name: String,
  gender: String,
  profilePic: { type: String, default: ""}, // static url of profile pic
  coverPic: { type: String,default: "" },  // static url of cover pic,

  // social information ....
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests_send: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  shares: [ {type: mongoose.Schema.Types.ObjectId, ref: 'post'} ],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  notification: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Notification'} ],
});

var User = mongoose.model('user',userSchema);
module.exports = User;

