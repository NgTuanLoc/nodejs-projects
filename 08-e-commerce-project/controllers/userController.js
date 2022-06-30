import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'user' }).select('-password');

	res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findOne({ _id: id }).select('-password');

	if (!user) {
		throw new NotFoundError(`There is no valid user with id: ${id}`);
	}

	res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
	res.send('Show Current User');
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

const updateUserPassword = async (req, res) => {
	res.send('Update User User');
};

export {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};
