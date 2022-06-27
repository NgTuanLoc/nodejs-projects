import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';

const createProduct = async (req, res) => {
	const product = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json({ product });
};

const getAllProduct = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json(products);
};

export { createProduct, getAllProduct };
