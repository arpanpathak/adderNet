const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 	type: String,
 	date: { type: Date , default: Date.now },
 	content: String,
 	privacy: String
});

var Post = mongoose.model('post',postSchema);

module.exports = Post;
