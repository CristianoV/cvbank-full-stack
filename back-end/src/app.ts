import express = require('express');
import 'express-async-errors';
import Login from './Routes/Login.route';
import Register from './Routes/Register.route';
import Account from './Routes/Account.route';
import Transaction from './Routes/Transaction.route';
import NotFound from './Routes/NotFound';
import cors = require('cors');
import { Error } from 'sequelize';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config():void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/login', Login);
    this.app.use('/register', Register);
    this.app.use('/account', Account);
    this.app.use('/transaction', Transaction);
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err) {
        return res.status(403).json({ error: err.message });
      }
      next();
    });
    this.app.use(NotFound)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
