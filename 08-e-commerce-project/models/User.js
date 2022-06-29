import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name must be provided'],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
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

export default mongoose.model('User', UserSchema);
