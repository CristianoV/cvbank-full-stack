import { Request, Response, Router } from 'express';
const NotFoundRoutes: Router = Router();

NotFoundRoutes.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default NotFoundRoutes;