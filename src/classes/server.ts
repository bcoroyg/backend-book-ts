import express, { Application } from "express";
import config from "../config";

export class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(config.port);

    //database

    //middlewares
    this.middlewares();
    //routes

    //errors

    //listen
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running`);
    })
  }
}
