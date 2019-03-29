const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000;

const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');
const exphbs = require('express-handlebars');



// INIT MIDDLEWARE
// app.use(logger);

// HANDLEBARS MIDDLEWARE
// set template engine to handlebars, set default layout for handlebar invocation
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// BODYPARSER INITILIZATION
// these lines allow us to parse raw json and form data, respectively
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HOMEPAGE ROUTE, USING HANDLEBARS
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Members App',
		members
	});
})

// SET STATIC FOLDER
// use is the method we utilize when we want to implement middleware. This static middleware is provided by express itself.
//app.use(express.static(path.join(__dirname, 'public')));

// SETUP ROUTER
app.use('/api/members', require('./routes/api/members'));


app.listen(port, () => {
	console.log(`Server now running on port ${port}`);
});
