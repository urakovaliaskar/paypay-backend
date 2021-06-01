const User = require('../models/User');
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
	const { email, password } = req.body;

	if (email && password) {
		const user = await User.query().findOne({ email });

		let passwordValid = false;
		if (user) passwordValid = await user.verifyPassword(password);

		console.log(user, password);

		if (user && user.email == email && passwordValid) {
			const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
				expiresIn: '24h',
			});

			delete user.password;

			res.json({
				message: 'Authentication is successful!',
				token: token,
				user,
			});
		} else {
			res.status(403).json({
				message: 'Incorrect email or password',
			});
		}
	} else {
		res.status(400).json({
			message: 'Authentication failed! Please check the request',
		});
	}
};

export const getUsers = async (req, res) => {
	let page = 0;
	let size = 20;
	if (req.body.page) page = req.body.page;
	if (req.body.size) size = req.body.size;
	try {
		const { results, total } = await User.query().page(page, size);
		if (results)
			await results.forEach(user => {
				delete user.password;
			});
		res.json({
			users: results,
			total,
		});
	} catch (error) {
		res.status(403).json({
			message: 'Request failed! Please check the request',
		});
	}
};

export const getUser = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!isNaN(id)) {
		try {
			const user = await User.query().findById(id);
			if (user) {
				delete user.password;
				res.json({
					user,
				});
			} else {
				res.json({
					message: 'User does not exist!',
				});
			}
		} catch (error) {
			res.status(403).json({
				message: 'Request failed! Please check the request',
			});
		}
	} else {
		res.json({
			message: 'Id must be a number!',
		});
	}
};

export const createUser = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const role = req.body.role ? req.body.role : 'user';

	if (email && password) {
		try {
			const exists = await User.query().findOne({ email });

			if (!exists) {
				const user = await User.query().insert({ email, password, role });

				if (user) {
					delete user.password;
					res.status(201).json({
						message: 'User created successfuly!',
						user,
					});
				} else {
					res.status(403).json({
						message: 'User creation failed! Please check the request',
					});
				}
			} else {
				res.status(403).json({
					message: 'User already exists',
				});
			}
		} catch (error) {
			res.status(404).json({
				message: error,
			});
		}
	} else {
		res.status(400).json({
			message: 'User creation failed! Please check the request',
		});
	}
};

export const updateUser = async (req, res) => {
	const email = req.body.email || null;
	const password = req.body.password || null;
	const role = req.body.role || null;
	const id = parseInt(req.params.id);

	const data = {};
	if (email) data.email = email;
	if (password) data.password = password;
	if (role) data.role = role;

	if (!isNaN(id)) {
		try {
			if (Object.keys(data).length) {
				const user = await User.query().patchAndFetchById(id, data);

				if (user) {
					delete user.password;
					res.json({
						message: 'User was updated successfuly',
						user,
					});
				} else {
					res.status(404).json({
						message: 'User does not exist',
					});
				}
			} else {
				res.status(400).json({
					message: 'User update failed! Please check the request',
				});
			}
		} catch (error) {
			res.status(404).json({
				message: error,
			});
		}
	} else {
		res.status(400).json({
			message: 'Id must be a number!',
		});
	}
};

export const deleteUser = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!isNaN(id)) {
		try {
			const user = await User.query().deleteById(id).returning('*');

			if (!user) {
				res.status(404).json({
					message: 'User does not exist',
				});
			} else {
				res.json({
					message: 'User was deleted successfuly',
				});
			}
		} catch (error) {
			res.json({
				message: 'Failed to delete user',
			});
		}
	} else {
		res.status(400).json({
			message: 'Id must be a number!',
		});
	}
};
