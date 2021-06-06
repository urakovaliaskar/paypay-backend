const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const Knex = require('knex');
const { Model } = require('objection');

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import auth from './routes/auth';
import user from './routes/user';
import review from './routes/review';
import feedback from './routes/feedback';

// objection setup
const knexfile = require('./knexfile');
const knex = Knex(knexfile[process.env.NODE_ENV]);
Model.knex(knex);

// api routes
app.use('/api/v1/login', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/reviews', review);
app.use('/api/v1/feedbacks', feedback);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
