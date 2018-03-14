/*** In this file add all the middleweres after importing them ***/

const passport=require('passport');
const cookieParser = require('cookie-parser'),
	  session= require('express-session'),
	  bodyParser = require('body-parser');

module.exports = (app) => {
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
}