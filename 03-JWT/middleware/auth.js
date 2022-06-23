import { CustomAPIError } from '../errors/custom-error.js';
import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '../errors/index.js';

export const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('No token valid !');
	}
	const token = authHeader.split(' ')[1];
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decodedToken;
		req.user = { id, username };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};
