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

export async function getTotalBorrowings() {
  const { rows } = await pool.query(
    'SELECT get_total_borrowings() as total'
  );
  return rows[0]?.total || 0;
}

export async function getPopularBooksCount() {
  const { rows } = await pool.query(
    'SELECT get_popular_books_count() as count'
  );
  return rows[0]?.count || 0;
}
