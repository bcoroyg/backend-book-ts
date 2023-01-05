import express, { Application } from 'express';
import config from '../config';
import { dbConnection } from '../lib';

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

    //errors

    //listen
    this.listen();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running`);
    });
  }
}
