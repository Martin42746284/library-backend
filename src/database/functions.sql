-- =====================================
-- FONCTIONS PL/pgSQL (STATISTIQUES)
-- =====================================

-- 📊 Top livres les plus empruntés
CREATE OR REPLACE FUNCTION top_books()
RETURNS TABLE (
    title VARCHAR,
    total_borrowed INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.title, COUNT(br.id)::INT AS total_borrowed
    FROM borrowings br
    JOIN books b ON br.book_id = b.id
    GROUP BY b.title
    ORDER BY total_borrowed DESC;
END;
$$ LANGUAGE plpgsql;


-- 👤 Top utilisateurs les plus actifs
CREATE OR REPLACE FUNCTION top_users()
RETURNS TABLE (
    username VARCHAR,
    total_borrowed INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.username, COUNT(br.id)::INT AS total_borrowed
    FROM borrowings br
    JOIN users u ON br.user_id = u.id
    GROUP BY u.username
    ORDER BY total_borrowed DESC;
END;
$$ LANGUAGE plpgsql;

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

-- Function to get top users by borrowing count (USER role only, exclude ADMIN)
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
  WHERE u.role = 'USER'
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

