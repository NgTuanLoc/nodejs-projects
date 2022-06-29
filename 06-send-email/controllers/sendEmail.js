import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
	let testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'fo3pargffjgx5rzv@ethereal.email',
			pass: 'XZ51ZuXkkR4gxWkuUb',
		},
	});
	let info = await transporter.sendMail({
		from: 'Tuan Loc <thang3ngay25123@gmail.com>',
		to: 'bar@example.com',
		subject: 'test email sender',
		html: '<h2>Tuan loc sending email</h2>',
	});
	res.json(info);
};
