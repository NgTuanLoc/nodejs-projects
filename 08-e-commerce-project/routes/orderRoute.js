import express from 'express';

import {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	createOrder,
	updateOrder,
} from '../controllers/orderController.js';
import { authorizedPermissionMiddleware } from '../middleware/authentication.js';

const router = express.Router();

router
	.route('/')
	.get(authorizedPermissionMiddleware('admin'), getAllOrders)
	.post(createOrder);

router.route('/showMyOrder').get(getCurrentUserOrders);

router.route('/:id').get(getSingleOrder).patch(updateOrder);

export default router;
