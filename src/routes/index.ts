import { Application, Router } from 'express';
import booksController from '../controllers/books.controller';

const routerAPI = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/books', booksController);
};

export default routerAPI;
