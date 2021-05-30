const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
