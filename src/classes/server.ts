import express, { Application } from 'express';
import SwaggerUI from 'swagger-ui-express';
import Debug from 'debug';
import config from '../config';
import { openApiConfiguration } from '../documentation';
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
    /**
     * Definir ruta de documentación
     */
    // activar en desarrollo
    config.dev
      ? this.app.use(
          '/docs',
          SwaggerUI.serve,
          SwaggerUI.setup(openApiConfiguration)
        )
      : null;
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
      const debug = Debug("app:server")
      //console.log(`Server running`);
      debug(`Server running`);
    });
  }

  get app() {
    return this._app;
  }
}
