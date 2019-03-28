const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000;

const path = require('path');

app.get('/', (req, res) => {
// 	// res.send('<h1>Hello world!... From nodemon!</h1>');
//
// 	// you can load HTML files this way, but we'd have to have separate routes for each page. This isn't ideal.
	res.sendFile(path.join(__dirname, 'public', 'index.html'))

// 	// instead, we want to make the public folder itself static with app.use
});



// use is the method we utilize when we want to implement middleware. This static middleware is provided by express itself.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Server now running on port ${port}`);
});
