const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000;

const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');



// INIT MIDDLEWARE
// app.use(logger);

// BASIC REST API EXAMPLE

// THIS ROUTE GRABS ALL MEMBERS
app.get('/api/members', (req, res) => {
	// .json method takes care of stringifying these JS objects for us.
	res.json(members);
})

// THIS ROUTE GRABS A SINGLE MEMBER, BY ID
app.get('/api/members/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if(found) {
		res.json(members.filter((member) => {
			if(member.id === parseInt(req.params.id)) {
				return member;
			}
		}))
	} else {
		// 400 = Bad Request
		res.status(400).json( {message: `No member with id of ${req.params.id} was found`} )
	}
});


// use is the method we utilize when we want to implement middleware. This static middleware is provided by express itself.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Server now running on port ${port}`);
});
