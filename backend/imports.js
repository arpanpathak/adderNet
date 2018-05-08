/*** In this file add all the middlewares after importing them ***/

const cookieParser = require('cookie-parser'),
	  session= require('express-session'),
	  bodyParser = require('body-parser'),
	  multer  = require('multer');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const keys = require('./config/keys.js');
const socketIO = require('socket.io');

module.exports = (app) => {

	require('./models/User');
	require('./models/Chat').Message;
	require('./models/Chat').Conversation;
	require('./models/Post');
	const passport = require('./config/passport-setup.js');

	app.use( bodyParser.urlencoded({ extended: true} ) );
	app.use(bodyParser.json());
	app.use(cookieParser());
	// database connection..
	mongoose.connect( keys.mongodb.db );
	mongoose.connection.on('connected',()=>{ console.log('connected to MongoDB') });
	mongoose.connection.on('error',(err)=>{ console.log(err) });

	// using MongoDB store for session...
	app.use(session({
	    secret: 'this is secret',
	    name: 'user-session-cookie',
	    cookie: { maxAge: null },
	    store: new MongoStore({mongooseConnection : mongoose.connection}),
	    proxy: true,
	    resave: true,
	    secure: false,
	    saveUninitialized: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());

}
