import * as userService from '../services/user.service.js';

export async function getProfile(req, res, next) {
  try {
    const user = await userService.getById(req.user.id);
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAll();
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    next(err);
  }
}
