import { Request, Response, Router } from 'express';

const app = Router();

app.get('/', (_request: Request, response: Response) => {
  response.status(200).json({ message: 'Login' });
});

export default app;
