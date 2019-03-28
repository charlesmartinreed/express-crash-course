const moment = require('moment');

// BASIC MIDDLEWARE CREATION EXAMPLE
const logger = (req, res, next) => {
	// this middleware will run everytime a request is made

	// logs the url that was hit
	// moment provides the date
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);

	// next is called to move the app to the next middleware in the stack
	next();
}

module.exports = logger;
