import { NextFunction, Request, Response, Router } from 'express';
import { BookService } from '../services';

const router = Router();
const _bookService = BookService.getInstance();

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const books = await _bookService.getBooks();
      res.status(200).json({
        data: books,
        message: 'books listed!',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body: book } = req;
      const createdBook = await _bookService.createBook(book);
      res.status(200).json({
        data: createdBook,
        message: 'books created!',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { bookId } = req.params;
      const book = await _bookService.getBookById(bookId);
      res.status(200).json({
        data: book,
        message: 'book retrieved!',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { bookId } = req.params;
      const { body: book } = req;
      const updatedBook = await _bookService.updateBook(bookId, book);
      res.status(200).json({
        data: updatedBook,
        message: 'book updated!',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { bookId } = req.params;
      const book = await _bookService.deleteBook(bookId);
      res.status(200).json({
        data: book,
        message: 'book deleted!',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
