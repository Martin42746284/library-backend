import { pool } from '../config/db.js';

export async function getAll() {
  const { rows } = await pool.query(
    'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC'
  );

  return rows;
}

export async function getById(id) {
  const { rows } = await pool.query(
    'SELECT id, username, role, created_at FROM users WHERE id = $1',
    [id]
  );

  if (!rows.length) {
    throw { status: 404, message: 'User not found' };
  }

  return rows[0];
}
