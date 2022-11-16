import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import dotenv = require('dotenv');
dotenv.config();

import app from './app';
import Login from './Routes/Login.route';
import Register from './Routes/Register.route';
import Account from './Routes/Account.route';
import Transaction from './Routes/Transaction.route';

const port = process.env.API_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/login', Login);
app.use('/register', Register);
app.use('/account', Account);
app.use('/transaction', Transaction);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    
    return res.status(403).json({ error: err.message });
  }
  next();
});

app.listen(port, () => console.log('ouvindo porta', port));
