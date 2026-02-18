-- =========================
-- SCHEMA : Library Database
-- =========================

DROP TABLE IF EXISTS borrowings CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- -------------------------
-- USERS
-- -------------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('ADMIN', 'USER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- BOOKS
-- -------------------------
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    stock INT NOT NULL CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------
-- BORROWINGS
-- -------------------------
CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returned_at TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_book
        FOREIGN KEY(book_id)
        REFERENCES books(id)
);

-- -------------------------
-- INDEX (Recherche rapide)
-- -------------------------
CREATE INDEX idx_books_search
ON books(title, author, isbn);

-- -------------------------
-- FUNCTIONS
-- -------------------------
-- Function to get top borrowed books
CREATE OR REPLACE FUNCTION top_books()
RETURNS TABLE(id INT, title VARCHAR, author VARCHAR, isbn VARCHAR, stock INT, created_at TIMESTAMP, count BIGINT) AS $$
  SELECT
    b.id,
    b.title,
    b.author,
    b.isbn,
    b.stock,
    b.created_at,
    COUNT(bor.id) as count
  FROM books b
  LEFT JOIN borrowings bor ON b.id = bor.book_id
  GROUP BY b.id, b.title, b.author, b.isbn, b.stock, b.created_at
  ORDER BY count DESC
  LIMIT 10;
$$ LANGUAGE SQL;

-- Function to get top users by borrowing count
CREATE OR REPLACE FUNCTION top_users()
RETURNS TABLE(id INT, username VARCHAR, email VARCHAR, role VARCHAR, created_at TIMESTAMP, count BIGINT) AS $$
  SELECT
    u.id,
    u.username,
    u.email,
    u.role,
    u.created_at,
    COUNT(bor.id) as count
  FROM users u
  LEFT JOIN borrowings bor ON u.id = bor.user_id
  GROUP BY u.id, u.username, u.email, u.role, u.created_at
  ORDER BY count DESC
  LIMIT 10;
$$ LANGUAGE SQL;

-- Function to get total borrowing count
CREATE OR REPLACE FUNCTION get_total_borrowings()
RETURNS BIGINT AS $$
  SELECT COUNT(*) FROM borrowings;
$$ LANGUAGE SQL;

-- Function to get count of books with at least one borrow
CREATE OR REPLACE FUNCTION get_popular_books_count()
RETURNS BIGINT AS $$
  SELECT COUNT(DISTINCT book_id) FROM borrowings;
$$ LANGUAGE SQL;
