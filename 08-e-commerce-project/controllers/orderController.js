import { BadRequestError, NotFoundError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { checkPermission } from '../utils/checkPermission.js';

const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = 'someRandomValue';
	return { client_secret, amount };
};

const getAllOrders = async (req, res) => {
	const orders = await Order.find({});
	res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(`Not found order with id: ${orderId}`);
	}
	checkPermission(req.user, order.user);
	res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
	const orders = await Order.find({ user: req.user.userId });
	res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const createOrder = async (req, res) => {
	const { tax, shippingFee, items: cartItems } = req.body;

	if (!cartItems || cartItems.length < 1) {
		throw new BadRequestError('No cart item is provided !');
	}

	if (!tax || !shippingFee) {
		throw new BadRequestError('Please provide tax or shipping Fee information');
	}

	let subTotal = 0;
	let orderItems = [];

	for (const item of cartItems) {
		const dbProduct = await Product.findOne({ _id: item.product });
		if (!dbProduct) {
			throw new NotFoundError(`Not found product with id: ${item.product}`);
		}

		const { name, price, image, _id } = dbProduct;
		const singleOrderItem = {
			amount: item.amount,
			name,
			price,
			image,
			product: _id,
		};
		// add item to order
		orderItems = [...orderItems, singleOrderItem];
		// calculate subtotal
		subTotal += item.amount * price;
	}
	// calculate total
	const total = tax + shippingFee + subTotal;
	// get client secret
	const paymentIntent = await fakeStripeAPI({
		amount: total,
		currency: 'usd',
	});

	const order = await Order.create({
		orderItems,
		total,
		subTotal,
		tax,
		shippingFee,
		clientSecret: paymentIntent.client_secret,
		user: req.user.userId,
	});

	res
		.status(StatusCodes.CREATED)
		.json({ order, clientSecret: order.clientSecret });
};

const updateOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const { paymentIntentId } = req.body;
	const order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(`Not found order with id: ${orderId}`);
	}
	checkPermission(req.user, order.user);

	order.paymentIntentId = paymentIntentId;
	order.status = 'paid';
	await order.save();

	res.status(StatusCodes.OK).json({ order });
};

export {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	createOrder,
	updateOrder,
};
