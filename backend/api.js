
/*** ALL APIS, @author: arpanp_athak,tirthamouli_baidya,subhamoy_sarkar ***/
/*** import your models here ***/
/*** | =======================================IMPORTS==============================================================    |***/
const mongoose = require('mongoose');

const User=mongoose.model('user');
const Post=mongoose.model('post');
const Comment=mongoose.model('comment'),
	  Message=mongoose.model('Message');
const Conversation=mongoose.model('Conversation');
const config=require('./config/keys');
const helpers=require('./lib/helpers');
const multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  	console.log(file.originalname);
    cb(null, Date.now() + "."+file.mimetype.split("/")[1]) //Appending extension
  }
})
let upload = multer({ storage: storage });

/*** ============================================================================================================ ***/

/* internal API */
 // this piece of code is moved to /lib/helpers.js file
/* end of this section */

// all server API ..
module.exports = (app,passport,io) => {

	require('./sockets/socket-routes.js')(io);
	const Online=require('./models/online-model');
	Online.remove({},()=>{
	  console.log("Cleared Online");
	});
	/// NOTE : -- socket.io added to this file.. you can emit any method to connected socket..
	// an API to get all the details about the developers/creators ...
	app.get('/creators', (req, res) => {
	  const creators = [
	    {id: 1, firstName: 'Arpan', lastName: 'Pathak'},
	    {id: 2, firstName: 'Tirthamouli', lastName: 'Baidya'},
	    {id: 3, firstName: 'Subhamoy', lastName: 'Sarkar'},

	  ];

	  res.json(creators);
	});

	// an API to see whether the user is authenticated and authorized to view certain api or not...
	app.get('/authenticated',(req,res) => {
		// if user is authenticated then user will not be null in request object...
		res.json({authenticated: req.isAuthenticated(), user: req.user, maxAge: req.session.cookie.maxAge });
	});

	//User Registration API...
	app.post('/registerUser',(req,res) => {
		User.findOne({ $or:[ {email: req.body.email},
							 {$and:  [{aadharNo: {"$ne":""}},{aadharNo: {"$ne":null}},{aadharNo: req.body.aadharNo} ] },
							 {phone: req.body.phoneNo.toString()} ]} ,
			//check if email Id already registered
			 (err,user)=>{
		 		if(user){
		 			let msg="";
		 			if(user.email==req.body.email) msg+='email,';
		 			if(user.aadharNo!=null && user.aadharNo!='' && user.aadharNo===req.body.aadharNo.toString()) msg+='aadharNo,';
		 			if(user.phone===req.body.phoneNo.toString()) msg+='phone no,';
		 			msg+=' already registered';
					res.json({"status":"failed","error": msg});
		 		}
				else{
					//Sanity check
					var email = req.body.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null ? req.body.email : false;
					var password = typeof(req.body.password) == 'string' && req.body.password.length > 7 ? req.body.password : false;
					var phone = req.body.phoneNo.toString(),aadharno,aadharNo=req.body.aadharNo.toString(),
						name=req.body.firstName+" "+req.body.lastName;

					// after sanity checking....	
					if(name && email && password && phone ){
						//hashing password
						var hash = helpers.hash(password);
						//Store user
						new User({'name': name,'email':email,'password':hash,'aadharNo': aadharNo,
								  date_created: Date.now(),'phone': phone})
								.save((newUser)=>{
										// if new uer is null then there is a problem in database...
										!newUser? res.json({"status" : "success","error":""}) :
												  res.json({"error" : "Unable to create user"});
							}
						);

					}else{
						res.json({"error" : "Invalid email and password type"});
					}
				}

			}
		);
	});

	// use this as auth failed callback URL....
	app.get('/authFailed',(req,res)=>res.json({'error': 'authentication failed!'}));

	// API to send OTP... currently using free twilio message service...
	app.get('/sendOTP',(req,res)=> helpers.sendTwilioSms("+919099994016","apni vogoban dada, ei nin OTP ="+helpers.RandomStringGenerate(6),
									(err)=> res.send(err?err:'sent') ) 
			);
	/*** =================================================================== ===============================================***/
	/*** authentication API ***/
	// this is the login api, here use passportJS callbacks to authenticate using
	// any strategy you want.. to add OAuth strategy , edit the required setup file...
	// EmailOTP will be added after implementing sendEmail( ) helper function...
	app.post('/login',passport.authenticate(['email-local','phone-local'],{failureRedirect: '/authFailed' }),
	  (req,res) => {
		res.json( {'loggedin' : true } );
	});
	// logout api
	app.get('/logout',(req,res) => {
		req.session.destroy();
		req.logout();
		
		res.json({ message: 'logged out','status': 'logged out'}) ;
		io.emit('logout',{data: 'test'});
	});
	

	//implementing music api
	app.get('/music',(req,res) => {
		//res.json({authenticated: req.isAuthenticated(), 'usern': req.user.name });
		res.json({usernm: "", userem: req.user.email });
		//res.json({'email':req.user.email});
	});

	// google oauth API
	app.get('/auth/google', passport.authenticate('google', {
	    scope: ['profile','email']
	}));

	// google OAuth callback URI
	app.get('/auth/google/callback',
	    	passport.authenticate('google',{ failureRedirect: '/authFailed',successRedirect: 'http://localhost:3000/profile' }),
	    	// This part of code will only be executed if successRedirect is not set in passport.authenticate()
	    	(req,res) => res.send(helpers.json_to_html(req.user))
	);

	// facebook OAuth API
	app.get('/auth/facebook',passport.authenticate('facebook'));
	// facebook OAuth callback URI... 
	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/authFailed',successRedirect: 'http://localhost:3000/profile' }),
	  // This part of code will only be executed if successRedirect is not set in passport.authenticate()
	  (req,res)=> { req.session.save((err)=>res.send(helpers.json_to_html(req.user)) ) } 
	);
	/*** =========================================================================================================== ***/

	/*** user info API ***/
	app.post('/user/changeDp',upload.fields([{name: 'image',maxCount:1}]),(req,res)=>{
		User.findByIdAndUpdate( req.user._id, { profilePic: req.files['image'][0].filename.toString() }).
		then((user)=>res.send( { 'changed': true,profilePic: req.files['image'][0].filename.toString()} ));
	});
	app.post('/user/changeCoverPic',upload.fields([{name: 'image',maxCount:1}]),(req,res)=>{
		User.findByIdAndUpdate( req.user._id, { coverPic: req.files['image'][0].filename.toString() }).
		then((user)=>res.send( { 'changed': true,coverPic: req.files['image'][0].filename.toString()} ));
	});
	app.post('/user/addFriend',(req,res)=>{
		User.findById(req.user._id).then((user)=>{
			user.friends.push(req.body._id);
			user.friend_requests_send.push(req.body._id);
			User.findById(req.body._id).
			then((friend_request_user)=>{
				friend_request_user.friend_requests.push(req.user._id);
				friend_request_user.save();
				user.save().then(res.send({added: true}));
			});
			
		});
	});
	/*** ====================================================================================end of this section ***/

	/*** user post APIs ***/
	app.get('/allPost',(req,res)=> {
		// Post.remove({},(err)=>{ res.send({fuck: true}) });
		Post.find({}).then((posts)=>res.send(posts));
	});
	/*** main APIs ***/
	app.post('/main/createPost',upload.fields([{name: 'image',maxCount:1},{name: 'video',maxCount: 1}]),
	  (req,res) => {
		console.log(req.files);
		console.log(req.body);
		if(req.body.postContent.trim()=="")
			res.send({error: 'post can not be empty'});
		User.findById(req.user._id).
			then((user)=>{
			if(user) 
				new Post({content: req.body.postContent, by: req.user._id, 
					image: req.files['image']?req.files['image'][0].filename.toString() : "",
					video: req.files['video']?req.files['video'][0].filename.toString() : "" })
					.save((err,post)=>{
					
					user.posts.push(post._id);
					user.save();
					res.send( {'_id': post._id });
			});
			
		});
		
	});
	app.get('/main/getAllPost',(req,res) => {
		User.findById(req.user._id).populate( [
		 { path: 'posts',
		   populate:  { 
		   		path: 'comments',
		 		populate: {path: 'by', select: 'name profilePic'} 
		 	}

		 },
		 { path: 'posts',
		   populate:  { 
		   		path: 'by',
		 		select: 'name profilePic'
		 	}

		 },

		 ]).

			then((user)=>{
			if(user) 
				res.send(user.posts);
			});
			
	});
	app.post('/main/getAllSharesById',(req,res) => {
		User.findById(req.body._id).populate( [
		 { path: 'shares',
		   populate:  { 
		   		path: 'comments',
		 		populate: {path: 'by', select: 'name profilePic'} 
		 	}

		 },
		 { path: 'shares',
		   populate:  { 
		   		path: 'by',
		 		select: 'name profilePic'
		 	}

		 },

		 ]).

			then((user)=>{
			if(user) 
				res.send(user.shares);
			});
			
	});

	app.post('/main/getAllPostById',(req,res) => {
		User.findById(req.body._id).populate( [
		 { path: 'posts',
		   populate:  { 
		   		path: 'comments',
		 		populate: {path: 'by', select: 'name profilePic'} 
		 	}

		 },
		 { path: 'posts',
		   populate:  { 
		   		path: 'by',
		 		select: 'name profilePic'
		 	}

		 },

		 ]).

			then((user)=>{
			if(user) 
				res.send(user.posts);
			});
			
	});
	app.post('/main/sharePost',(req,res)=>{
		User.findById(req.user._id).then((user)=>{
			user.shares.push(req.body._id);
			user.save();
			Post.findById(req.body._id).then((post)=>{
				post.shared_by.push(req.user._id);
				post.save().then(res.send( { 'shared': true}));
			});
		});
	})
	app.post('/main/addComment',(req,res)=>{
		Post.findById(req.body._id).then((post)=>{

			var comment = new Comment({postId: req.body.id,content: req.body.content, by: req.user._id});
			new Comment({content: req.body.content, by: req.user._id})
				.save((err,comment)=>{
				
				post.comments.push(comment._id);
				post.save().then(()=>
				res.send({added: true, content: comment.content, by: req.user.name})
				);
			});
			
		});
	});
	app.post('/main/addLike',(req,res)=>{
		Post.findById(req.body._id).then((post)=>{
			post.likes.push(req.user._id);
			post.save().then(()=>res.send({added: 'added'}));
		})
	});
	app.post('/main/addDislike',(req,res)=>{
		Post.findById(req.body._id).then((post)=>{
			post.dislikes.push(req.user._id);
			post.save().then(()=>res.send({added: 'added'}));
		})
	});
	app.post('/main/sharePost',(req,res)=>{
		User.findById(req.user._id).then((user)=>{
			user.shares.push(req._id);
			post.save().then(()=>res.send({added: 'added'}));
		})
	});
	
	app.post('/main/updatePost',(req,res) => {
		Post.findByIdAndUpdate(req.body._id,{content: req.body.content})
			.then(res.send({updated: 'true'}));
	});
	app.post('/main/updatePost',(req,res) => {
		Post.findByIdAndUpdate(req.body._id,{content: req.body.content})
			.then(res.send({updated: 'true'}));
	});
	app.post('/main/deletePost',(req,res) => {
		Post.findByIdAndRemove(req.body._id,()=> {
			User.findById(req.user._id).then((user)=>{ user.posts.pull({_id: req.body._id}) 
				user.save();
				Comment.remove({postId: req.body._id});
				res.send({deleted: 'true'}) 
			});
			
		});
	});
	/** ================================================================ **/
	/** end of this section **/


	/*** ___________________message sending and retreiving APIs.____________________________ ***/
	app.get('/main/getAllMessages',(req,res) => {
		User.findById(req.body._id).populate('messages').then((messages)=>{ res.send(messages)});
	});
	app.get('/t',(req,res)=> Conversation.find({}).then(conversation=>res.send(conversation)) );
	app.post('/main/getConversation',(req,res) => {
		let conversation_id= (req.user._id<req.body.to)? 
							 (req.user._id+"_"+req.body.to) : (req.body.to+"_"+req.user._id);
		console.log(conversation_id);
		console.log(req.body.to);
		Conversation.findById(conversation_id).populate('messages').then(conversation=>{ 
			if(!conversation){
				  conversation=new Conversation({_id: conversation_id });
				  conversation.save();
				 
			}  
			res.send(conversation.messages );
		} );
	});
	app.post('/main/sendMessage',upload.fields([{name: 'image',maxCount:1},{name: 'video',maxCount: 1},
			 {name: 'voice',maxCount: 1}]),(req,res)=>{
		let conversation_id= (req.user._id<req.body.to)? 
							 (req.user._id+"_"+req.body.to) : (req.body.to+"_"+req.user._id);
		
		if(req.body.to.trim()=="")
			conversation_id=req.user._id; // 

		var msg=new Message({data: req.body.data,by: req.user._id,to: req.body.to });
		if(req.files && req.files['image'] && req.files['image'][0]){
			msg.data=req.files['image'][0].filename.toString();
			msg.type='image';
		}else if(req.files && req.files['video'] && req.files['video'][0]){
			msg.data=req.files['video'][0].filename.toString();
			msg.type='video';
		
		}else if(req.files && req.files['voice'] && req.files['voice'][0]){
			msg.data=req.files['voice'][0].filename.toString();
			msg.type='voice';
		
		}
		msg.save();
		Conversation.findById(conversation_id).then(
			conversation=>{
				conversation.messages.push(msg);
				conversation.save().then( ()=>{ 
					Online.find({id: req.body.to}).then((onlineData)=>{
					          onlineData.forEach((onlinePerson)=>{
					          	
					            io.to(onlinePerson.socket).emit('message-received',msg);
					          });
					 });
					Online.find({id: req.user._id}).then((onlineData)=>{
							 console.log('emiting to '+req.user._id);
					          onlineData.forEach((onlinePerson)=>{
					            io.to(onlinePerson.socket).emit('sent',msg);
					            
					          });
					 });
					res.send({ sent: true }) 
				});

			}
		)

	});
	
	/*** ======================END======================================***/	

	app.get('/currentUser',(req,res)=> User.findById(req.user._id).then((user)=>res.send(user)));

	app.post('/getUserById',(req,res)=> User.findById(req.body._id).then((user)=>res.send(user)));

	app.post('/main/getAllFriends', (req,res)=>{
		User.findById(req.body._id).populate({
			path: 'friends',
			select: 'name profilePic coverPic'
		}).then((user)=>res.send(user.friends));
	});

	
	app.post('/main/getAllFriendsId', (req,res)=>{
		User.findById(req.body._id).
			then((user)=>res.send(user.friends));
	});

	app.get('/newsFeed',(req,res)=>{
		User.findById(req.user._id).populate(
		[{
			path: 'friends',
			populate: {
				path: 'posts'
			},
			select: 'posts'	
		},
		{path: 'posts',populate: {path: 'comments'} }

		]).select('posts').then(user=>res.send(user.friends)); // user.friends is now populated list of posts of all the friends...
	});
	app.get('/onlineUsers',(req,res)=>{
		Online.find({}).populate({'path': 'id',select: 'name profilePic'}).then((user)=>res.send(user));
	});
	app.get('/searchUser',(req,res)=>{
		let name=req.query.name;
		User.find({$or:[{name: new RegExp(name, "i")},{email: new RegExp(name, "i")},{phone:RegExp(name, "i")} ]},null,{sort:'_id'})
		.select('name').select('profilePic').select('phone')
		.then((users)=>{ 
			res.send(users);
		} );	
	})
	/*** ......................... **/
	// Test API
	//importing the unit test file....
	require('./tests.js')(app); 
}

/*
 * Search for friend below here
 *
 */

// app.get('/searchFriend',(req, res)=>{
// 	name = typeof(req.query.name) == 'string' && req.query.name.trim().length > 0 ? req.query.name.trim() : false;
// 	if(name){
// 		helpers.searchFriend(name, (err, data)=>{
// 			if(!err && data){
// 				res.json(data);
// 			}else{
// 				res.send("No data found");
// 			}
// 		});
// 	}else{
// 		res.send("Error: Please enter valid search name");
// 	}
// });

