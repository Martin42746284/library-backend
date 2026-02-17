import * as bookService from '../services/book.service.js';

export async function getAllBooks(req, res, next) {
  try {
    const books = await bookService.getAll(req.query);
    res.json({
      success: true,
      data: books
    });
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const book = await bookService.create(req.body);
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const book = await bookService.getById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const book = await bookService.update(req.params.id, req.body);
    res.json({
      success: true,
      data: book
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    await bookService.remove(req.params.id);
    res.json({
      success: true,
      message: 'Book deleted'
    });
  } catch (err) {
    next(err);
  }
}
