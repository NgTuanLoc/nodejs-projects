import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name must be provided'],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, 'email must be provided'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid Email !',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password must be provided'],
		minlength: 6,
	},
});

UserSchema.pre('save', async function (next) {
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
	next();
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userID: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};

UserSchema.methods.comparePassword = async function (inputPassword) {
	return bcryptjs.compare(inputPassword, this.password);
};

export default mongoose.model('User', UserSchema);
