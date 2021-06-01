const express = require('express');
const authenticate = require('../middlewares/authenticate');
import { login } from '../controllers/Users';

let router = express.Router();

router.post('/', login);

module.exports = router;
