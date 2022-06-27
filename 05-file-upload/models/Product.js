import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide file name'],
	},
	price: {
		type: Number,
		requited: [true, 'Please provide price'],
	},
	image: {
		type: String,
		required: [true, 'Please provide image file'],
	},
});

export default mongoose.model('Product', productSchema);
