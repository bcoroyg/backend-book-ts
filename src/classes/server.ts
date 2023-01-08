import express, { Application } from 'express';
import SwaggerUI from 'swagger-ui-express';
import Debug from 'debug';
import fileUpload from 'express-fileupload';
import cors from 'cors';
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
    //!config.test ? this.listen() : null;
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
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
    //cors
    this.app.use(
      cors({
        origin: (origin, cb) => {
          const whitelist = [config.urlFrontend];
          //revisar si la peticion viene de un servidor que esta en whitelist
          const exists = whitelist.some((domain) => domain === origin);

          if (exists) {
            cb(null, true);
          } else {
            cb(new Error('Not allowed by CORS!.'));
          }
        },
      })
    );
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
      const debug = Debug('app:server');
      //console.log(`Server running`);
      debug(`Server running`);
    });
  }

  get app() {
    return this._app;
  }
}
