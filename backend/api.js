/*** import your models here ***/
const mongoose = require('mongoose');

const User=mongoose.model('user');
const config=require('./config/keys');
const helpers=require('./lib/helpers');
var prettyHtml = require('json-pretty-html').default; 
/* internal API */
 // this piece of code is moved to /lib/helpers.js file
/* end of this section */

// all server API ..
module.exports = (app,passport) => {

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
		res.json({authenticated: req.isAuthenticated(), user: req.user });
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
	app.get('/sendOTP',(req,res)=> helpers.sendTwilioSms("+919099994016","apni vogoban dada, ei nin OTP="+helpers.RandomStringGenerate(6),
									(err)=> res.send(err?err:'sent') ) 
			);
	/*** =================================================================== ***/
	/*** authentication API ***/
	// this is the login api, here use passportJS callbacks to authenticate using
	// any strategy you want.. to add OAuth strategy , edit the required setup file...
	// EmailOTP will be added after implementing sendEmail( ) helper function...
	app.post('/login',passport.authenticate(['email-local','phone-local'],{failureRedirect: '/authFailed' }),
	  (req,res) => {
	  	console.log(req);
		res.json( {'loggedin' : true } );
	});
	// logout api
	app.get('/logout',(req,res) => {
		req.logout();
		req.user=null;
		req.session.destroy( ()=> res.json({ message: 'logged out','status': 'logged out'}) );
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

	// Test API
	//importing the unit test file....
	require('./tests.js')(app); 
}
