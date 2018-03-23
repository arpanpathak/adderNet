/*** In this file add all the middlewares after importing them ***/

const cookieParser = require('cookie-parser'),
	  session= require('express-session'),
	  bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const keys = require('./config/keys.js');
const passport = require('./config/passport-setup.js');
module.exports = (app) => {
	
	app.use( bodyParser.urlencoded({ extended: true} ) );
	app.use(cookieParser());
	// database connection..
	mongoose.connect( keys.mongodb.db )
	mongoose.connection.on('connected',()=>{ console.log('connected to MongoDB') });
	mongoose.connection.on('error',(err)=>{ throw err });
	
	// using MongoDB store for session...
	app.use(session({
	    secret: 'this is secret',
	    name: 'user-session-cookie',
	    store: new MongoStore({mongooseConnection : mongoose.connection}),
	    proxy: true,
	    resave: true,
	    secure: false,
	    saveUninitialized: true
	}));

	app.use(passport.initialize());
}