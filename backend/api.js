/*** import your models here ***/
const User=require('./models/User.js');

module.exports = (app) => {

	// an API to get all the details about the developers/creators ... 
	app.get('/creators', (req, res) => {
		console.log(app);
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
		var results=[];
		User.find({},(err,users)=>{ results.push(users) });
		res.json( {users: results }) ;
	});
}