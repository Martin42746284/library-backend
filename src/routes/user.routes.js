import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// Profile
router.get('/me', authenticate, userController.getProfile);

// All users (admin only)
router.get('/', authenticate, isAdmin, userController.getAllUsers);

export default router;
