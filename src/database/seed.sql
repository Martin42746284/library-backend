-- =========================
-- SEED DATA (Jeu minimum)
-- =========================

-- -------------------------
-- USERS (3 dont 1 admin)
-- admin: password = admin1234
-- alice: password = alice1234
-- bob: password = bob1234
-- -------------------------
INSERT INTO users (username, email, password_hash, role) VALUES
('admin','admin@test.com','$2b$10$QUU/nARXrFPX4eWKwu3yRe..SMpXStwH2UWwGURKpm9HTJPpdxpnm','ADMIN'),
('alice', 'alice@test.com','$2b$10$klGdyurWrV1GZVMTAmh5H.AhE5NmCarWFAboTY7akgtFg4SX9mYsS','USER'),
('bob','bob@test.com','$2b$10$qqApLcsUjnXSQj94eOsKven170tUvlg8Vn18MWgom.OfqDiehWKZ6','USER');

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
