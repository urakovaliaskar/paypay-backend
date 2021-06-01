import { getErrorMessage } from '../utils';

module.exports = (req, res, next) => {
	const { user } = req;

	if (!user || user.role !== 'admin') {
		return getErrorMessage(res, 403, "You don't have access to this route");
	} else {
		next();
	}
};
