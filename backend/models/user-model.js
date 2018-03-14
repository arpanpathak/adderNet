const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  googleId: String,
  friends: Array,
  profilePic: String
});

var User = mongoose.model('user',userSchema);

module.exports = User;
