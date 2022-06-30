import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { attachCookieToResponse } from '../utils/index.js';

const register = async (req, res) => {
	const { email, name, password } = req.body;
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError('Email is already existed');
	}

	// First registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';

	// Create User
	const user = await User.create({ email, name, password, role });

	// Send back Token and Cookie
	const tokenUser = { name: user.name, userId: user._id, role: user.role };
	attachCookieToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password to login');
	}
	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError(`This email: ${email} is not existed`);
	}

	const isPasswordCorrect = await user.verifyPassword(password);
	if (!isPasswordCorrect) {
		throw new BadRequestError('Invalid Password !');
	}

	// Send back Token and Cookie
	const tokenUser = { name: user.name, userId: user._id, role: user.role };
	attachCookieToResponse({ res, user: tokenUser });

	res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).send({ msg: 'user logout !' });
};

export { register, login, logout };
