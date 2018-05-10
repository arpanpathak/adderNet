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
	app.use(cookieParser());
	// database connection..
	

}
