import { UnauthenticatedError, Unauthorized } from '../errors/index.js';
import { verifyJWT } from '../utils/index.js';

const authMiddleware = (req, res, next) => {
	const token = req.signedCookies.token;

	if (!token) {
		throw new UnauthenticatedError('Authentication Error !');
	}

	try {
		const payload = verifyJWT({ token });
		const { name, userId, role } = payload;
		req.user = { name, userId, role };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Something wrong with Authentication');
	}
};

const authorizedPermissionMiddleware = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new Unauthorized('Unauthorized to access this route');
		}
		next();
	};
};

export { authorizedPermissionMiddleware, authMiddleware };
