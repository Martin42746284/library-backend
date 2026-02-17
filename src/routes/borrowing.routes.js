import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as borrowingController from '../controllers/borrowing.controller.js';

const router = express.Router();

// Borrow a book
router.post('/:bookId', authenticate, borrowingController.borrowBook);

// Return a book
router.put('/:bookId/return', authenticate, borrowingController.returnBook);

// My borrowings
router.get('/me', authenticate, borrowingController.myBorrowings);

export default router;