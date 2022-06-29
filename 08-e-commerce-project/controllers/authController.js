import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
	const { email, name, password } = req.body;
	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError('Email is already existed');
	}

	// First registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';

	const user = await User.create({ email, name, password, role });
	res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
	res.send('login');
};

const logout = async (req, res) => {
	res.send('logout');
};

export { register, login, logout };
