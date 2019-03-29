// EXPRESS ROUTER SETUP
const express = require('express'),
			router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

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
		res.status(400).json( {message: `No member with id of ${req.params.id} was found`} );
	}
});

// THIS ROUTE CREATES A NEW MEMBER
router.post('/', (req, res) => {
	// res.send(req.body);
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	};

	if(!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include a name and email' });
	}

	members.push(newMember);
	res.json(members);
});

module.exports = router;
