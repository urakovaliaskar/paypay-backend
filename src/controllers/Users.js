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
