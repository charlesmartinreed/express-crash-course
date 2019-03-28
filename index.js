const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000;

const path = require('path');
const members = require('./Members');

// BASIC REST API EXAMPLE

// THIS ROUTE GRABS ALL MEMBERS
app.get('/api/members', (req, res) => {
	// .json method takes care of stringifying these JS objects for us.
	res.json(members);
})



// use is the method we utilize when we want to implement middleware. This static middleware is provided by express itself.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Server now running on port ${port}`);
});
