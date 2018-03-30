/*** import your models here ***/
const User=require('./models/User.js');
const config=require('./config/keys');
const helpers=require('./lib/helpers');
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
	app.post('/authenticated',(req,res) => {
		// if user is authenticated then user will not be null in request object...
		res.json({authenticated: true});
	});

	// this is the login api, here use passportJS callbacks to authenticate using
	// any strategy you want.. to add OAuth strategy , edit the required setup file...

	app.post('/login',(req,res) => {

	});

	// user registration api... before using any model, use require('..') to import them
	// from /models directory of this project..
	app.post('/register',(req,res) => {
	  console.log(req.body);
	  res.string(`hello${req.body.firstName}`);
	});


	// logout api
	app.get('/logout',(req,res) => {
		req.session.destroy();
		res.json({ status: 'logged out'});
	});

	app.post('/registerUser',(req,res) => {
		//Sanity check
		var email = req.body.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null ? req.body.email : false;
		var password = typeof(req.body.password) == 'string' && req.body.password.length > 7 ? req.body.password : false;
		if(email && password){
			//hashing password
			var hash = helpers.hash(password);
			//Store user
			new User({'email':email,'password':hash}).save((newUser)=>{
						!newUser? res.json({"success" : "Created user"}) :
								  res.json({"error" : "Unable to create user"});
						}
					);
		}else{
			res.json({"Error" : "Invalid email and password type"});
		}

	});

	app.post('/auth',passport.authenticate('email-local', {successRedirect: '/auth', failureRedirect: '/authFailed' }),
		(req,res)=>{

		}
	);
	
	app.get('/authFailed',(req,res)=>res.json({'error': 'authentication failed!'}));
	app.get('/delete_all',(req,res)=> User.remove({ },(err)=> res.send(err? err:  'cleared all users..') ) );

	app.get('/sendOTP',(req,res)=> helpers.sendTwilioSms("917686009276",helpers.RandomStringGenerate(6),
									(err)=> res.send(err?err:'sent') ) 
			);


}
