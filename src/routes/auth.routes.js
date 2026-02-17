import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

//Deconnexion
router.post('/logout', authController.logout);

export default router;
