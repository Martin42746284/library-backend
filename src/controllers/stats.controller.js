import * as statsService from '../services/stats.service.js';

export async function topBooks(req, res, next) {
  try {
    const stats = await statsService.topBooks();
    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
}

export async function topUsers(req, res, next) {
  try {
    const stats = await statsService.topUsers();
    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
}
