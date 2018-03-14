/** This is our API server **/

const express = require('express');
const cookieParser = require('cookie-parser'),
	  session= require('express-session'),
	  bodyParser = require('body-parser');
const app = express();
app.use( bodyParser.urlencoded({ extended: true} ) );
app.use(cookieParser());
app.use(session({
    secret: 'this is secret',
    name: 'user-session-cookie',
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser());

app.get('/creators', (req, res) => {
	
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

/* start the server */
const port = 5000;

app.listen(port, () => {
		console.log(`Server running on port ${port}`);
				  
});