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
		return res.status(400).json({ message: 'Please include a name and email' });
	}

	members.push(newMember);
	res.json(members);
	// res.redirect('/');
});

// THIS ROUTE UPDATES AN EXISTING MEMBER
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))

	if(found) {
		const updatedMember = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)) {
				// ternary checks if the value was passed in to be changed, if not keep it what it was originally set
				member.name = updatedMember.name ? updatedMember.name : member.name;
				member.email = updatedMember.email ? updatedMember.email : member.email;

				res.json({message: 'Member was updated', member});
			}
		});
	} else {
		// 400 = Bad Request
		res.status(400).json( {message: `No member with id of ${req.params.id} was found`} );
	}
})

// THIS ROUTE DELETES AN EXISTING MEMBER
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id))

	if(found) {
		res.json({
			message: 'Member Deleted',
			members: members.filter(member => member.id !== parseInt(req.params.id))
		});
	} else {
		// 400 = Bad Request
		res.status(400).json( {message: `No member with id of ${req.params.id} was found`} );
	}

})

module.exports = router;
