import { Application, Router } from 'express';
import booksController from '../controllers/books.controller';
import searchController from '../controllers/search.controller';

const routerAPI = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/books', booksController);
  router.use('/search', searchController);
};

export default routerAPI;
