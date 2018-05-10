/*** import your models here ***/
const mongoose = require('mongoose');

const User=mongoose.model('user');
const Post=mongoose.model('post');
const Comment=mongoose.model('comment');
const Conversation=mongoose.model('Conversation');
const config=require('./config/keys');
const helpers=require('./lib/helpers');
const prettyHtml = require('json-pretty-html').default; 
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

/* internal API */
 // this piece of code is moved to /lib/helpers.js file
/* end of this section */

// all server API ..
module.exports = (app,passport,io) => {

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
	/*** =================================================================== ***/
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
	/*** =================================================================== ***/

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
	/*** end of this section ***/

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

	app.get('/main/getAllMessages',(req,res) => {
		User.findById(req.body._id).populate('messages').then((messages)=>{ res.send(messages)});
	});

	app.get('/main/getConversation',(req,res) => {
		let conversation_id= (req.user._id<req.body.to)
		Conversation.findById(req.body._id).then((conversation)=>{ res.send(conversation)});
	});
		

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

		
	/*** ......................... **/
	// Test API
	//importing the unit test file....
	require('./tests.js')(app); 
}
