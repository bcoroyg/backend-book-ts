import express, { Application } from 'express';
import config from '../config';
import { dbConnection } from '../lib';
import routerAPI from '../routes';
import { errorHandler, logErrors, notFoundHandler } from '../utils/middlewares';

export class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(config.port);

    //database
    this.dbConnect();

    //middlewares
    this.middlewares();

    //routes
    this.routes();

    //errors
    this.errors();

    //listen
    this.listen();
  }

  async dbConnect() {
    await dbConnection();
  }

  routes() {
    routerAPI(this.app);
  }

  middlewares() {
    this.app.use(express.json());
  }

  errors() {
    //Error 404
    this.app.use(notFoundHandler);
    // Middlewares errors
    this.app.use(logErrors);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running`);
    });
  }
}
