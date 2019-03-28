const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000;

const path = require('path');
const logger = require('./middleware/logger');



// INIT MIDDLEWARE
// app.use(logger);

// SET STATIC FOLDER
// use is the method we utilize when we want to implement middleware. This static middleware is provided by express itself.
app.use(express.static(path.join(__dirname, 'public')));

// SETUP ROUTER
app.use('/api/members', require('./routes/api/members'));

app.listen(port, () => {
	console.log(`Server now running on port ${port}`);
});
