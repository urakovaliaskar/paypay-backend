const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Knex = require('knex');
const { Model } = require('objection');

const auth = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// objection setup
const knexfile = require('./knexfile');
const knex = Knex(knexfile[process.env.NODE_ENV]);
Model.knex(knex);

// api routes

app.use('/api/v1/login', auth);
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
