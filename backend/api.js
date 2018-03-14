module.exports = (app) => {
	app.get('/creators', (req, res) => {
		console.log(app);
	  const creators = [
	    {id: 1, firstName: 'Arpan', lastName: 'Pathak'},
	    {id: 2, firstName: 'Tirthamouli', lastName: 'Baidya'},
	    {id: 3, firstName: 'Subhamoy', lastName: 'Sarkar'},
	  ];

	  res.json(creators);
	});

	app.post('/login',(req,res) => {

	});

	app.post('/register',(req,res)=> {
	  console.log(req.body);
	  res.string(`hello${req.body.firstName}`);
	});
	app.get('/logout',(req,res) => {
		req.session.destroy();
		res.json({ status: 'logged out'});
	});
}