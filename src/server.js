const app = require('./app');
app.listen(process.env.PORT, () =>
	console.log(`Running on localhost ${process.env.PORT}`)
);
