import express from 'express';
import { uploadImage } from '../controllers/uploadsController.js';
import {
	createProduct,
	getAllProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/products').post(createProduct).get(getAllProduct);
router.route('/products/uploads').post(uploadImage);

export default router;
