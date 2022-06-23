import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide name, email or password !');
	}
	const user = await User.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
	res.send('login user');
};

export { register, login };
