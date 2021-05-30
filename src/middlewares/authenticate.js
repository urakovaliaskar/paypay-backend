module.exports = function (req, res, next) {
	const header = req.headers.authorization;

	if (!header) {
		return res.status(401).json({ errors: [{ message: 'No token provided' }] });
	}

	//Bearer token
	const token = header.split(' ')[1];

	req.userId = 1;
	console.log(token);

	next();
};
