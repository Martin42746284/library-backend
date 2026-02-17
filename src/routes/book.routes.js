import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';
import * as bookController from '../controllers/book.controller.js';

const router = express.Router();

// Public
router.get('/', bookController.getAllBooks);

// Admin only
router.post('/', authenticate, isAdmin, bookController.createBook);
router.put('/:id', authenticate, isAdmin, bookController.updateBook);
router.delete('/:id', authenticate, isAdmin, bookController.deleteBook);

export default router;