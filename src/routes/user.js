import express from 'express';
import authenticate from '../middlewares/authenticate';
import admin from '../middlewares/admin';
import {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
} from '../controllers/Users';

let user = express.Router();

user.get('/', authenticate, getUsers);
user.get('/:id', authenticate, getUser);
user.post('/', [authenticate, admin], createUser);
user.put('/:id', [authenticate, admin], updateUser);
user.delete('/:id', [authenticate, admin], deleteUser);

export default user;
