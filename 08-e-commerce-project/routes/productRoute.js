import express from 'express';

import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} from '../controllers/productController.js';
import {
	authMiddleware,
	authorizedPermissionMiddleware,
} from '../middleware/authentication.js';

const router = express.Router();

router
	.route('/')
	.post(
		[authMiddleware, authorizedPermissionMiddleware('admin')],
		createProduct
	)
	.get(getAllProducts);

router
	.route('/:id')
	.get(getSingleProduct)
	.patch(
		[authMiddleware, authorizedPermissionMiddleware('admin')],
		updateProduct
	)
	.delete(
		[authMiddleware, authorizedPermissionMiddleware('admin')],
		deleteProduct
	);

router
	.route('/:id/uploadimage')
	.post([authMiddleware, authorizedPermissionMiddleware('admin')], uploadImage);
    
export default router;
