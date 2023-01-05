import createHttpError from 'http-errors';
import config from '../config';
import { Book } from '../database/models';

export class BookService {
  private static _bookServiceInstance: BookService;

  constructor() {}

  static getInstance() {
    if (!BookService._bookServiceInstance) {
      BookService._bookServiceInstance = new BookService();
    }
    return BookService._bookServiceInstance;
  }

  //lista de libros
  async getBooks() {
    let books = await Book.find({});
    books = books.map((book) => {
      book.image = `${config.publicUrl}/images/${book.image}`;
      return book;
    });
    return books;
  }

  //crear libro
  async createBook(book: any) {
    const createdBook = await Book.create(book);
    return createdBook;
  }

  //mostrar un libro por ID
  async getBookById(bookId: string) {
    const book = await Book.findById(bookId);
    if (!book) {
      throw createHttpError(404, 'Book not found!');
    }
    book.image = `${config.publicUrl}/images/${book.image}`;
    return book;
  }

  //actualizar libro por ID
  async updateBook(bookId: string, book: any) {
    const updatedBook = await Book.findByIdAndUpdate(bookId, book, {
      new: true,
    });
    if (!updatedBook) {
      throw createHttpError(404, 'Book not found!');
    }
    return updatedBook;
  }

  //eliminar un libro por ID
  async deleteBook(bookId: string) {
    const bookDB = await this.getBookById(bookId);
    const deletedBook = await bookDB.delete();
    return deletedBook;
  }
}
