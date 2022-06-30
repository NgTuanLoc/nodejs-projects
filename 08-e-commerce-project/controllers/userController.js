import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import {
	NotFoundError,
	BadRequestError,
	UnauthenticatedError,
} from '../errors/index.js';
import {
	createTokenUser,
	attachCookieToResponse,
	checkPermission,
} from '../utils/index.js';

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'user' }).select('-password');

	res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findOne({ _id: id }).select('-password');

	checkPermission(req.user, id);

	if (!user) {
		throw new NotFoundError(`There is no valid user with id: ${id}`);
	}

	res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
	const { name, email } = req.body;
	const { userId } = req.user;

	if (!name || !email) {
		throw new BadRequestError('name and email must be provided');
	}

	const user = await User.findOneAndUpdate(
		{ _id: userId },
		{ name, email },
		{
			runValidators: true,
			new: true,
		}
	);

	const userToken = createTokenUser(user);
	attachCookieToResponse({ res, user: userToken });
	res.status(StatusCodes.OK).json({ user });
};

const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const { userId } = req.user;
	const user = await User.findOne({ _id: userId });
	const isPasswordCorrect = await user.verifyPassword(oldPassword);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Wrong password !');
	}
	user.password = newPassword;
	await user.save();
	res.status(StatusCodes.OK).json({ msg: 'Password changed successfully' });
};

export {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};
