/** This is our API server **/

const express = require('express');
const app = express(),
      imports=require('./imports')(app);
      api=require('./api')(app,require('./config/passport-setup.js')),
      multer=require('multer'),
      path=require('path');
const cors = require('cors');
const helpers = require('./lib/helpers');

// allowing ajax request...
app.use(cors({origin: '*'}));

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

/** testing multer **/
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

io.on('connection', (socket) => {
    console.log("Someone connected", socket.id);
});