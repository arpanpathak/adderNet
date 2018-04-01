/** This is our API server **/

const express = require('express');
const app = express(),
      imports=require('./imports')(app);
      api=require('./api')(app,require('./config/passport-setup.js'));
const cors = require('cors');
// allowing ajax request...
app.use(cors({origin: '*'}));

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
/* start the server */

const port = 5000;

app.listen(port, () => {
		console.log(`Server running on port ${port}`);
				  
});