import { StatusCodes } from 'http-status-codes';

import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { BadRequestError } from '../errors/bad-request.js';
import { NotFoundError } from '../errors/not-found.js';
import { checkPermission } from '../utils/checkPermission.js';

const createReview = async (req, res) => {
	const { product: productId } = req.body;
	const { userId } = req.user;
	const isValidProduct = await Product.findOne({ _id: productId });
	if (!isValidProduct) {
		throw new BadRequestError(`No product with id: ${productId}`);
	}

	req.body.user = userId;

	const isAldreadySubmit = await Review.findOne({
		product: productId,
		user: userId,
	});

	if (isAldreadySubmit) {
		throw new BadRequestError('You have aldreay reviewed this product');
	}

	const review = await Review.create(req.body);
	res.status(StatusCodes.CREATED).json({ review });
};

const getAllReview = async (req, res) => {
	const reviews = await Review.find({});
	res.status(StatusCodes.OK).json(reviews);
};

const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new NotFoundError(`Not found review with id: ${reviewId}`);
	}
	res.status(StatusCodes.OK).json(review);
};

const updateReview = async (req, res) => {
	res.send('Update Review');
};

const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new NotFoundError(`Not found review with id: ${reviewId}`);
	}
	checkPermission(req.user, review.user);
	await review.remove();
	res
		.status(StatusCodes.OK)
		.json({ msg: `Delete review with id: ${reviewId} successfully` });
};

export {
	createReview,
	getAllReview,
	getSingleReview,
	updateReview,
	deleteReview,
};
