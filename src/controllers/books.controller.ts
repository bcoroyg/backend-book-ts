import { NextFunction, Request, Response, Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import passport from 'passport';
import { BookService } from '../services';
import { bookIdValidator, createBookValidator, updateBookValidator } from '../utils/validators';

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
  passport.authenticate('jwt', { session: false }),
  createBookValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body: book } = req;
      const createdBook = await _bookService.createBook(
        book,
        <UploadedFile>req.files?.file
      );
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
  bookIdValidator,
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
  passport.authenticate('jwt', { session: false }),
  updateBookValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { bookId } = req.params;
      const { body: book } = req;
      const updatedBook = await _bookService.updateBook(
        bookId,
        book,
        <UploadedFile>req.files?.file
      );
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
  passport.authenticate('jwt', { session: false }),
  bookIdValidator,
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
