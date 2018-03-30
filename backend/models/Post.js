const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 	type: String,
 	date: { type: Date , default: Date.now },
 	content: String,
 	privacy: String,
 	shared_by: [ { type: mongoose.Schema.Types.ObjectId,ref: 'user'} ],
 	tags: { type: mongoose.Schema.Types.ObjectId,ref: 'user' }
});

var Post = mongoose.model('post',postSchema);

module.exports = Post;
