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
        msg: 'books listed!',
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
      res.status(201).json({
        data: createdBook,
        msg: 'books created!',
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
        msg: 'book retrieved!',
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
        msg: 'book updated!',
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
        msg: 'book deleted!',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
