import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { UnauthenticatedError } from '../errors/index.js';

export const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('Authentication Invalid !');
	}

	const token = authHeader.split(' ')[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.userID, name: payload.name };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
};
