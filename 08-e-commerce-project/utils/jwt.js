import jwt from 'jsonwebtoken';

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

const verifyJWT = ({ token }) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookieToResponse = ({ res, user }) => {
	const oneDay = 1000 * 24 * 3600;
	const token = createJWT({ payload: user });
	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
		signed: true,
	});
};

export { createJWT, verifyJWT, attachCookieToResponse };
