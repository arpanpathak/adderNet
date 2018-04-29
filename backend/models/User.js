const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  date_created: { type: Date  },
  userid: mongoose.Schema.Types.ObjectId,
  username: String,
  email: { type:String, unique: false },
  googleId: { type:String, unique: false},
  fbId: { type:String, unique: false},
  aadharNo: { type: String},
  phone: String,
  password: String,

  // personal information....
  name: String,
  gender: String,
  profilePic: String, // static url of profile pic
  coverPic: String,  // static url of cover pic,

  // social information ....
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  friend_requests_send: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  blocked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  shares: [ {type: mongoose.Schema.Types.ObjectId, ref: 'post'} ],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  notification: [ {} ],
});

mongoose.model('user',userSchema);

