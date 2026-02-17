import { pool } from '../config/db.js';

export async function borrowBook(userId, bookId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const book = await client.query(
      'SELECT * FROM books WHERE id = $1 FOR UPDATE',
      [bookId]
    );

    if (!book.rows.length || book.rows[0].stock <= 0) {
      throw { status: 400, message: 'Book unavailable' };
    }

    const borrowing = await client.query(
      'INSERT INTO borrowings (user_id, book_id) VALUES ($1, $2) RETURNING id, user_id, book_id, borrowed_at, returned_at',
      [userId, bookId]
    );

    await client.query(
      'UPDATE books SET stock = stock - 1 WHERE id = $1',
      [bookId]
    );

    await client.query('COMMIT');

    // Return borrowing with nested book object
    const row = borrowing.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      book_id: row.book_id,
      borrowed_at: row.borrowed_at,
      returned_at: row.returned_at,
      books: {
        id: book.rows[0].id,
        title: book.rows[0].title,
        author: book.rows[0].author,
        isbn: book.rows[0].isbn,
        stock: book.rows[0].stock - 1, // Decremented by the update above
        created_at: book.rows[0].created_at
      }
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function returnBook(userId, bookId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const borrowing = await client.query(
      `SELECT id, user_id, book_id, borrowed_at, returned_at FROM borrowings
       WHERE user_id = $1 AND book_id = $2 AND returned_at IS NULL
       LIMIT 1
       FOR UPDATE`,
      [userId, bookId]
    );

    if (!borrowing.rows.length) {
      throw { status: 400, message: 'No active borrowing found' };
    }

    const updatedBorrowing = await client.query(
      'UPDATE borrowings SET returned_at = NOW() WHERE id = $1 RETURNING id, user_id, book_id, borrowed_at, returned_at',
      [borrowing.rows[0].id]
    );

    const bookDetails = await client.query(
      'SELECT id, title, author, isbn, stock, created_at FROM books WHERE id = $1',
      [bookId]
    );

    await client.query(
      'UPDATE books SET stock = stock + 1 WHERE id = $1',
      [bookId]
    );

    await client.query('COMMIT');

    // Return borrowing with nested book object
    const row = updatedBorrowing.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      book_id: row.book_id,
      borrowed_at: row.borrowed_at,
      returned_at: row.returned_at,
      books: bookDetails.rows[0]
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getUserBorrowings(userId) {
  const { rows } = await pool.query(
    `SELECT
       br.id,
       br.user_id,
       br.book_id,
       br.borrowed_at,
       br.returned_at,
       b.id as book_id_dup,
       b.title,
       b.author,
       b.isbn,
       b.stock,
       b.created_at
     FROM borrowings br
     JOIN books b ON br.book_id = b.id
     WHERE br.user_id = $1
     ORDER BY br.borrowed_at DESC`,
    [userId]
  );

  // Map to match Borrowing interface with nested books object
  return rows.map(row => ({
    id: row.id,
    user_id: row.user_id,
    book_id: row.book_id,
    borrowed_at: row.borrowed_at,
    returned_at: row.returned_at,
    books: {
      id: row.book_id_dup,
      title: row.title,
      author: row.author,
      isbn: row.isbn,
      stock: row.stock,
      created_at: row.created_at
    }
  }));
}
