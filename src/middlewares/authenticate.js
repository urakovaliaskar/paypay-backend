import jwt from 'jsonwebtoken';
import User from '../models/User';
import { getErrorMessage } from '../utils';

module.exports = (req, res, next) => {
	const header = req.headers.authorization;

	if (!header) {
		return res.status(401).json({ message: 'No token provided' });
	}

	// Get token
	const token = header.split(' ')[1];

	// Token verification
	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
			if (err) {
				if (err.name == 'TokenExpiredError') {
					return getErrorMessage(res, 401, 'Token is expired');
				} else {
					return getErrorMessage(res, 401, 'Token is not valid');
				}
			} else {
				try {
					const user = await User.query().findOne({ email: decoded.email });
					if (!user) {
						return getErrorMessage(res, 401, 'No user with such token exists');
					} else {
						req.user = user;
						next();
					}
				} catch (error) {
					return getErrorMessage(res, 401, 'Failed to check token');
				}
			}
		});
	} else {
		return getErrorMessage(res, 401, 'Auth token is not supplied');
	}
};
