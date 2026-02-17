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
