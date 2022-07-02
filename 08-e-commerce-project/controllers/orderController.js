import Order from '../models/Order.js';

const getAllOrders = async (req, res) => {
	res.send('Get all Orders');
};
const getSingleOrder = async (req, res) => {
	res.send('Get Single Orders');
};
const getCurrentUserOrders = async (req, res) => {
	res.send('Get current user orders');
};
const createOrder = async (req, res) => {
	res.send('Create Order');
};
const updateOrder = async (req, res) => {
	res.send('Update Order');
};

export {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	createOrder,
	updateOrder,
};
