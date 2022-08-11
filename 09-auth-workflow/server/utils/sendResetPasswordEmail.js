const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
	const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;

	const message = `
  <h1>Hello ${name} </h1>
  <p>Please reset password by clicking on the following link : <a href='${resetURL}'>Reset Password</a></p>
  `;

	return sendEmail({ to: email, subject: 'Reset Password', html: message });
};

module.exports = sendResetPasswordEmail;
