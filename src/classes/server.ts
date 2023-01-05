import express, { Application } from 'express';
import config from '../config';
import { dbConnection } from '../lib';
import routerAPI from '../routes';
import { errorHandler, logErrors, notFoundHandler } from '../utils/middlewares';

export class Server {
  private _app: Application;
  private port: number;

  constructor() {
    this._app = express();
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
    //Desactivar listen en test
    !config.test ? this.listen() : null;
  }

  async dbConnect() {
    await dbConnection();
  }

  routes() {
    routerAPI(this._app);
  }

  middlewares() {
    this._app.use(express.json());
  }

  errors() {
    //Error 404
    this._app.use(notFoundHandler);
    // Middlewares errors
    this._app.use(logErrors);
    this._app.use(errorHandler);
  }

  listen() {
    this._app.listen(this.port, () => {
      console.log(`Server running`);
    });
  }

  get app() {
    return this._app;
  }
}
