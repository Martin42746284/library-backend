import { pool } from '../config/db.js';

export async function topBooks() {
  const { rows } = await pool.query(
    'SELECT * FROM top_books()'
  );
  return rows;
}

export async function topUsers() {
  const { rows } = await pool.query(
    'SELECT * FROM top_users()'
  );
  return rows;
}
