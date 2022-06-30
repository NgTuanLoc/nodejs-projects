import express from 'express';
import {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} from '../controllers/userController.js';
import { authorizedPermissionMiddleware } from '../middleware/authentication.js';

const router = express.Router();

// If you have many role instead only admin or user
router.get('/', authorizedPermissionMiddleware('admin', 'owner'), getAllUsers);
router.get('/showMe', showCurrentUser);

router.patch('/updateUser', updateUser);
router.patch('/updateUserPassword', updateUserPassword);

router.get('/:id', getSingleUser);

export default router;
