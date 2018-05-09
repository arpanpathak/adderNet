const mongoose = require('mongoose');

const Comment = mongoose.model('comment',
	  new mongoose.Schema({
	  	postId: {type: mongoose.Schema.Types.ObjectId},
	  	content: String,
	  	image: String,
	  	video: String,
	  	audio: String,
	  	date: { type: Date , default: Date.now },
	  	by: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	  	likes: [{ type: mongoose.Schema.Types.ObjectId }],
	  	dislikes: [{ type: mongoose.Schema.Types.ObjectId }],
	  	
	  })
);

const postSchema = new mongoose.Schema({
	by: { type: mongoose.Schema.Types.ObjectId,ref: 'user' },
 	type: String,
 	date: { type: Date , default: Date.now },
 	content: String,
 	image: String,
 	video: String,
 	audio: String,
 	privacy: String, 

 	likes: [{ type: mongoose.Schema.Types.ObjectId }],
 	dislikes: [{ type: mongoose.Schema.Types.ObjectId }],
 	shared_by: [ { type: mongoose.Schema.Types.ObjectId,ref: 'user'} ],
 	tags: [ { type: mongoose.Schema.Types.ObjectId,ref: 'user' }],
 	comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'comment'} ]
});

var Post = mongoose.model('post',postSchema);

module.exports = { Post,Comment };
