/** This is our API server **/

const express = require('express');
const app = express(),
      imports=require('./imports')(app);
      api=require('./api')(app,require('./config/passport-setup.js'));
/* start the server */

const port = 5000;

app.listen(port, () => {
		console.log(`Server running on port ${port}`);
				  
});