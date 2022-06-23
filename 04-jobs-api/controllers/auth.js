import { StatusCodes } from 'http-status-codes';
import bcryptjs from 'bcryptjs';

import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ test: user.createJWT() });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password for login !');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError('Invalid user email !');
	}
	// Checking password
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		throw new UnauthenticatedError('Invalid Password !');
	}

	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name, token } });
};

export { register, login };
