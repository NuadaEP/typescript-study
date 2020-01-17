import Dotenv from 'dotenv';
import Express from 'express';
import Mongoose from 'mongoose';

Dotenv.config();

import databaseConfig from '../config/database';
import Routes from './routes';

class App {
  public server: Express.Application;

  public constructor() {
    this.server = Express();

    this.database();
    this.middwares();
    this.routes();
    this.exception();
  }

  private database(): void {
    Mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }

  private middwares(): void {
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.server.use(Routes);
  }

  private exception() {
    this.server.use(async (err, req, res, next) =>
      res.status(err.status || 500).json({ error: 'Internal Server Error' })
    );
  }
}

export default new App().server;
