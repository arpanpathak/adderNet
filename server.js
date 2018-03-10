/** This is our API server **/

const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const creators = [
    {id: 1, firstName: 'Arpan', lastName: 'Pathak'},
    {id: 2, firstName: 'Tirthamouli', lastName: 'Baidya'},
    {id: 3, firstName: 'Subhamoy', lastName: 'Sarkar'},
  ];

  res.json(creators);
});

const port = 5000;

app.listen(port, () => {
					console.log(`Server running on port ${port}`)
				  
				  } 
);