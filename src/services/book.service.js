import { pool } from '../config/db.js';

export async function getAll(query) {
  const { search } = query;

  if (search) {
    const { rows } = await pool.query(
      `SELECT * FROM books
       WHERE title ILIKE $1
          OR author ILIKE $1
          OR isbn ILIKE $1
       ORDER BY created_at DESC`,
      [`%${search}%`]
    );
    return rows;
  }

  const { rows } = await pool.query(
    'SELECT * FROM books ORDER BY created_at DESC'
  );
  return rows;
}

export async function create(data) {
  const { title, author, isbn, stock } = data;

  const { rows } = await pool.query(
    `INSERT INTO books (title, author, isbn, stock)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, author, isbn, stock]
  );

  return rows[0];
}

export async function update(id, data) {
  const { title, author, isbn, stock } = data;

  const { rows } = await pool.query(
    `UPDATE books
     SET title = $1, author = $2, isbn = $3, stock = $4
     WHERE id = $5
     RETURNING *`,
    [title, author, isbn, stock, id]
  );

  if (!rows.length) {
    throw { status: 404, message: 'Book not found' };
  }

  return rows[0];
}

export async function remove(id) {
  const result = await pool.query(
    'DELETE FROM books WHERE id = $1',
    [id]
  );

  if (!result.rowCount) {
    throw { status: 404, message: 'Book not found' };
  }
}
