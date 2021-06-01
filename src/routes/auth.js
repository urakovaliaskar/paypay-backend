const express = require('express');
const authenticate = require('../middlewares/authenticate');
import { login } from '../controllers/Users';

let auth = express.Router();

auth.post('/', login);

export default auth;
