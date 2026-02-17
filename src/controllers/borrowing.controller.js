import * as borrowingService from '../services/borrowing.service.js';

export async function borrowBook(req, res, next) {
  try {
    const result = await borrowingService.borrowBook(
      req.user.id,
      req.params.bookId
    );
    res.json({
      success: true,
      data: result,
      message: 'Book borrowed successfully'
    });
  } catch (err) {
    next(err);
  }
}

export async function returnBook(req, res, next) {
  try {
    const result = await borrowingService.returnBook(
      req.user.id,
      req.params.bookId
    );
    res.json({
      success: true,
      data: result,
      message: 'Book returned successfully'
    });
  } catch (err) {
    next(err);
  }
}

export async function myBorrowings(req, res, next) {
  try {
    const borrowings = await borrowingService.getUserBorrowings(
      req.user.id
    );
    res.json({
      success: true,
      data: borrowings
    });
  } catch (err) {
    next(err);
  }
}
