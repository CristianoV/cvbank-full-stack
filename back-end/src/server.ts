import app from './app';
// require('express-async-errors');
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import Login from './Routes/Login.route';
import Register from './Routes/Register.route';

const port = process.env.API_PORT || 3000;

app.get('/', (_request, response) => {
  response.send('Hello World!');
});

app.use('/login', Login);
app.use('/register', Register);


app.listen(port, () => console.log('ouvindo porta', port));
