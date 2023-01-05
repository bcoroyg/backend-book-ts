import { Application, Router } from 'express';
import booksController from '../controllers/books.controller';
import searchController from '../controllers/search.controller';
import authController from '../controllers/auth.controller';

//Importar strategias en routes, para evitar error(Unknown authentication strategy)
import "../utils/auth"

const routerAPI = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/books', booksController);
  router.use('/search', searchController);
  router.use('/auth', authController);
};

export default routerAPI;
