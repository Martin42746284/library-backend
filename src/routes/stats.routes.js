import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';
import * as statsController from '../controllers/stats.controller.js';

const router = express.Router();

// Admin only
router.get('/books', authenticate, isAdmin, statsController.topBooks);
router.get('/users', authenticate, isAdmin, statsController.topUsers);
router.get('/borrowings/total', authenticate, isAdmin, statsController.totalBorrowings);
router.get('/popular-books', authenticate, isAdmin, statsController.popularBooksCount);

export default router;
