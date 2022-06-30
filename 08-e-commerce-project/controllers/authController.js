import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';
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

	// Send back Token and Setup Cookie
	const tokenUser = { name: user.name, userId: user._id, role: user.role };
	attachCookieToResponse({ res, user: tokenUser });
	res.status(201).json({ user: tokenUser, token });

};

const login = async (req, res) => {
	res.send('login');
};

const logout = async (req, res) => {
	res.send('logout');
};

export { register, login, logout };
