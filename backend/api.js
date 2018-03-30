/*** import your models here ***/
const User=require('./models/User.js');
/* internal API */
let random=(min, max)=> Math.random() * (max - min) + min ;
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

	// this api is used for unitTesting, use tests.js file to add unit tests..
	app.get('/test',(req,res) => {
		var results=null;
		User.find({},(err,users)=>{ console.log(users); res.json({'users':users}) });
	});

	app.get('/registerUser',(req,res) => { 
		new User({'email':'abc@gmail.com'})
		res.json(usr);
	});
	app.post('/auth',passport.authenticate('email-local', {successRedirect: '/auth', failureRedirect: '/authFailed' }),
		(req,res)=>{ 
			
		}
	);
	app.get('/authFailed',(req,res)=>res.json({'error': 'authentication failed!'}));

}