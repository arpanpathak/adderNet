// @@This file is for testing out API...
// @@usage...  write all the unit tests here .......

/*** import your models here ***/
const mongoose = require('mongoose');

const User=mongoose.model('user');
const Message=mongoose.model('Message');
const Conversation=mongoose.model('Conversation');
const Post=mongoose.model('post');
const Comment =mongoose.model('comment');
const config=require('./config/keys');
const helpers=require('./lib/helpers');

module.exports = (app)=> {
	/**** here are some unit tests done on the api.. USE this test APIs to test main APIs... ***/
	app.get('/create',(req,res)=> { new User({email: 'abcd@gmail.com',aadharNo: '1234',date_created: Date.now()}).save(); res.send('done') });
	app.get('/all_users',(req,res)=> { 
		User.find({},(err,user)=>{
			res.send( user ); 
		});
	});
	// delete all user
	app.get('/delete_all',(req,res)=> User.remove({ },(err)=> res.send(err? err:  'cleared all users..') ) );
}