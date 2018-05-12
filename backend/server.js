/** This is our API server **/

const express = require('express');
const app = express(),
      imports=require('./imports')(app),
      multer=require('multer'),
      path=require('path');
const cors = require('cors');
const helpers = require('./lib/helpers'),
      passport=require('./config/passport-setup.js'),
      passportSocketIo = require('passport.socketio');


const cookieParser = require('cookie-parser'),
    session= require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    keys = require('./config/keys.js');

mongoose.connect( keys.mongodb.db );
mongoose.connection.on('connected',()=>{ console.log('connected to MongoDB') });
mongoose.connection.on('error',(err)=>{ console.log(err) });
const mongooseStore=new MongoStore({mongooseConnection : mongoose.connection});
  // using MongoDB store for session...
  var sessionMiddleware = session({
      secret: 'this is secret',
      name: 'user-session-cookie',
      key: 'user-session-cookie',
      cookie: { expires: new Date(253402300000000) },
      store: mongooseStore,
      // proxy: true,
       resave: true,
      // secure: false,
       saveUninitialized: true
  });
  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

// allowing ajax request...
app.use(cors({origin: '*'}));
// app.use(function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "X-Requested-With");
//         res.header("Access-Control-Allow-Headers", "Content-Type");
//         res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//         next();
//     });
app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

app.post('/music', (req, res) => {
  console.log('test');
  window.location.href='http://127.0.0.1:8000/music';
});
/* start the server */

/** static files directory for all uploads **/
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
 
//create a storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, req.NAME);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//Setting up multer
const upload = multer({
  storage:storage,
  limits:{fileSize:25*1024*1024},
    fileFilter: function(req, file, cb){
      helpers.sanitize(req, file, cb);
    }
}).any();


/** end of section **/
const port = 5000;

const server=app.listen(port, () => {
		console.log(`Server running on port ${port}`);
				  
});

// socket.io setup.. 
const socket = require('socket.io'),
io = socket(server);
// io.use(passportSocketIo.authorize({
//   cookieParser: cookieParser,
//   //name: 'user-session-cookie',
//   key: 'user-session-cookie',
//   secret: 'this is secrete',
//   passport: passport,
//   store: mongooseStore,
//   success: (data,accept)=>{console.log('authorizeed.'); accept(null,true) },
//   fail: (data, message, error, accept)=>{
//   if(error)
//     throw new Error(message);
//   console.log(data);
//   accept(null, false);
// }

// }));
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

// importing API routes....
require('./api')(app,passport,io);

// importing get and post APIs