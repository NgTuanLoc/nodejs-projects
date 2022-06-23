import jwt from 'jsonwebtoken';
import { BadRequest } from '../errors/index.js';

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new BadRequest('username and password must be provided !');
	}
	const id = new Date().getDate();
	const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
		expiresIn: '10d',
	});

	res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	const { username } = req.user;
	const luckyNumber = Math.floor(Math.random() * 101);
	res.status(200).json({
		msg: `Hello, ${username}`,
		secret: `Here is your authorized data: ${luckyNumber}`,
	});
};

export { login, dashboard };
