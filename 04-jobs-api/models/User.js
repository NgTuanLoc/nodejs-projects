import mongoose from 'mongoose';

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
		maxlength: 20,
	},
});

export default mongoose.model('User', UserSchema);
