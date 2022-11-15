import { Request, Response, Router } from 'express';

const app = Router();

app.get('/', (_request: Request, response: Response) => {
  response.status(201).json({ message: 'Registrado' });
});

export default app;
