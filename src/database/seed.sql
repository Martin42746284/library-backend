-- =========================
-- SEED DATA (Jeu minimum)
-- =========================

-- -------------------------
-- USERS (3 dont 1 admin)
-- password = 123456 (bcrypt)
-- -------------------------
INSERT INTO users (username, email, password_hash, role) VALUES
('admin','admin@test.com','admin1234','ADMIN'),
('alice', 'alice@test.com','alice1234','USER'),
('bob','bob@test.com','bob1234','USER');

-- -------------------------
-- BOOKS (10 minimum)
-- -------------------------
INSERT INTO books (title, author, isbn, stock) VALUES
('Clean Code', 'Robert C. Martin', '9780132350884', 5),
('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 4),
('Design Patterns', 'Erich Gamma', '9780201633610', 3),
('Refactoring', 'Martin Fowler', '9780201485677', 4),
('Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', 2),
('You Don’t Know JS', 'Kyle Simpson', '9781491904244', 6),
('JavaScript: The Good Parts', 'Douglas Crockford', '9780596517748', 5),
('Database System Concepts', 'Silberschatz', '9780073523323', 3),
('PostgreSQL Up & Running', 'Regina Obe', '9781449370001', 4),
('Learning SQL', 'Alan Beaulieu', '9780596520830', 5);

-- -------------------------
-- BORROWINGS
-- -------------------------
INSERT INTO borrowings (user_id, book_id) VALUES
(2, 1),
(2, 2),
(3, 3),
(3, 1),
(2, 4);

-- Mise à jour du stock
UPDATE books SET stock = stock - 1 WHERE id IN (1,2,3,4);
