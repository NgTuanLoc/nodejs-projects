import express from 'express';

import {
	createReview,
	getAllReview,
	getSingleReview,
	updateReview,
	deleteReview,
} from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authentication.js';

const router = express.Router();

router.route('/').get(getAllReview).post(authMiddleware, createReview);
router
	.route('/:id')
	.get(getSingleReview)
	.patch(authMiddleware, updateReview)
	.delete(authMiddleware, deleteReview);

export default router;
