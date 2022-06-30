import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name must be provided'],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email must be provided'],
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email',
		},
	},
	password: {
		type: String,
		required: [true, 'Password must be provided'],
		minlength: 10,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
});

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) reuturn;
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.verifyPassword = async function (inputPassword) {
	const isMatch = await bcryptjs.compare(inputPassword, this.password);
	return isMatch;
};

export default mongoose.model('User', UserSchema);
