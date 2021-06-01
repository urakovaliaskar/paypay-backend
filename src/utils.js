export const getErrorMessage = (res, code, message) => {
	return res && res.status(code || 400).json({ message });
};
