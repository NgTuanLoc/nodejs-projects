import { StatusCodes } from 'http-status-codes';
import path from 'path';
import cloudinary from 'cloudinary';
import fs from 'fs';

import { BadRequestError } from '../errors/index.js';

const __dirname = path.resolve() + '/05-file-upload/';

const uploadImageLocal = async (req, res) => {
	if (!req.files) {
		throw new BadRequestError('No File Uploaded !');
	}

	const productImage = req.files.image;

	if (!productImage.mimetype.startsWith('image')) {
		throw new BadRequestError('Please provide image file');
	}

	if (productImage.size > process.env.FILE_MAX_SIZE) {
		throw new BadRequestError('Image File reaches more than 4MB');
	}

	const imagePath = path.join(
		__dirname,
		'../public/uploads/' + `${productImage.name}`
	);
	await productImage.mv(imagePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadImage = async (req, res) => {
	const result = await cloudinary.v2.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: 'file-upload',
		}
	);

	fs.unlinkSync(req.files.image.tempFilePath);
	return res.status(StatusCodes.OK).json({
		image: { src: result.secure_url },
	});
};

export { uploadImageLocal, uploadImage };
