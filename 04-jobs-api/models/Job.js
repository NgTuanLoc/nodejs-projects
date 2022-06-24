import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'company must be provided'],
		},
		position: {
			type: String,
			required: [true, 'position must be provided'],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Job', JobSchema);
