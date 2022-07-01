import express from 'express';

import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} from '../controllers/productController.js';
import { getAllReviewsFromProduct } from '../controllers/reviewController.js';
import { authorizedPermissionMiddleware } from '../middleware/authentication.js';

const router = express.Router();

router
	.route('/')
	.post(authorizedPermissionMiddleware('admin'), createProduct)
	.get(getAllProducts);

router
	.route('/:id')
	.get(getSingleProduct)
	.patch(authorizedPermissionMiddleware('admin'), updateProduct)
	.delete(authorizedPermissionMiddleware('admin'), deleteProduct);

router
	.route('/:id/uploadimage')
	.post(authorizedPermissionMiddleware('admin'), uploadImage);

router.route('/:id/reviews').get(getAllReviewsFromProduct);

export default router;
