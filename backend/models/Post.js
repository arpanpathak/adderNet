const mongoose = require('mongoose');

const Comment = mongoose.model('comment',
	  new mongoose.Schema({
	  	content: String,
	  	from: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	  	reacts: [{type: String, by: { type: mongoose.Schema.Types.ObjectId } }]
	  })
);

const postSchema = new mongoose.Schema({
	by: { type: mongoose.Schema.Types.ObjectId,ref: 'user' },
 	type: String,
 	date: { type: Date , default: Date.now },
 	content: String, // 
 	privacy: String, 
 	reacts: [{type: String, by: { type: mongoose.Schema.Types.ObjectId } }],
 	shared_by: [ { type: mongoose.Schema.Types.ObjectId,ref: 'user'} ],
 	tags: [ { type: mongoose.Schema.Types.ObjectId,ref: 'user' }],
 	comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'comment'} ]
});

var Post = mongoose.model('post',postSchema);

module.exports = { Post,Comment };
