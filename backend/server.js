/** This is our API server **/

const express = require('express');
const app = express(),
      imports=require('./imports')(app);
      api=require('./api')(app,require('./config/passport-setup.js')),
      multer=require('multer'),
      path=require('path');
const cors = require('cors');
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
var storage = (dir,)=>
 multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ storage: storage });
app.post('/file',upload.single('avtar'), (req, res) => {
  res.send('hola');
});
/** end of section **/
const port = 5000;

app.listen(port, () => {
		console.log(`Server running on port ${port}`);
				  
});