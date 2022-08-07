import { StatusCodes } from 'http-status-codes';
import path from 'path';

import Product from '../models/Product.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';

const __dirname = path.resolve();

const createProduct = async (req, res) => {
	req.body.user = req.user.userId;
	const product = await Product.create(req.body);

	res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
	const { id: productId } = req.params;
	const product = await Product.findOne({ _id: productId }).populate('reviews');

	if (!product) {
		throw new NotFoundError(
			`Get Product unsuccessfully ! Not found product with id: ${productId}`
		);
	}

	res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
	const { id: productId } = req.params;
	const product = await Product.findOneAndUpdate(
		{
			_id: productId,
		},
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!product) {
		throw new NotFoundError(
			`Update product unsuccessfully ! Not found product with id: ${productId}`
		);
	}

	res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
	const { id: productId } = req.params;
	const product = await Product.findOne({ _id: productId });

	if (!product) {
		throw new NotFoundError(
			`Delete product unsuccessfully ! Not found product with id: ${productId}`
		);
	}
	await product.remove();

	res
		.status(StatusCodes.OK)
		.json({ msg: `Delete product ${productId} successfully` });
};

const uploadImage = async (req, res) => {
	if (!req.files) {
		throw new BadRequestError('No file uploaded');
	}
	const uploadImage = req.files.image;

	if (!uploadImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('Please Upload Image');
	}

	const maxSize = 1024 * 1024;

	if (uploadImage.size > maxSize) {
		throw new BadRequestError('Image size is bigger than 1MB');
	}

	const pathImage = __dirname + '/public/uploads/' + uploadImage.name;
	uploadImage.mv(pathImage);

	res
		.status(StatusCodes.CREATED)
		.json({ msg: `Image: ${uploadImage.name}  uploaded !` });
};

export {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
};
