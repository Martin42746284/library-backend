import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service.js';

export async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    // Generate token for immediate login after registration
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
    try {
        await authService.logout(req.user.id);
        res.json({
            success: true,
            message: 'Logged out successfully'}); 
        } 
    catch (err) {
        next(err);
    } 
}
