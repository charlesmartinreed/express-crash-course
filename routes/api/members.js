// EXPRESS ROUTER SETUP
const express = require('express'),
			router = express.Router();
const members = require('../../Members');

// BASIC REST API EXAMPLE

// THIS ROUTE GRABS ALL MEMBERS
router.get('/', (req, res) => {
	// .json method takes care of stringifying these JS objects for us.
	res.json(members);
})

// THIS ROUTE GRABS A SINGLE MEMBER, BY ID
router.get('/:id', (req, res) => {
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

module.exports = router;
