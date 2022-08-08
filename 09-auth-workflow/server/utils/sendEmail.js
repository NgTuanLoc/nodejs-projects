const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport(nodemailerConfig);
	console.log(
		'🚀 ~ file: sendEmail.js ~ line 7 ~ sendEmail ~ nodemailerConfig',
		nodemailerConfig
	);

	// send mail with defined transport object
	return transporter.sendMail({
		from: '"NgTuanLoc" <tuanloc2352000@gmail.com>', // sender address
		to,
		subject,
		html,
	});
};

module.exports = sendEmail;
