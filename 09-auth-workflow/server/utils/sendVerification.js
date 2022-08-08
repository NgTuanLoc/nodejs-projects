const sendEmail = require('./sendEmail');

const sendVerification = async ({ name, email, verificationToken, origin }) => {
	const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

	const message = `
  <h1>Hello ${name} </h1>
  <p>Please confirm your email by clicking on the following link : <a href='${verifyEmail}'>Verify Email</a></p>
  `;

	return sendEmail({ to: email, subject: 'Email verification', html: message });
};

module.exports = sendVerification;
