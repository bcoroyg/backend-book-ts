import express, { Application } from "express";

export class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 3000;

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
