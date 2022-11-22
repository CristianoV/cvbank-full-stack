import { NextFunction, Request, Response } from 'express';
import User from '../database/models/user';

export default class UserMiddleware {

  public async checkUserExists(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new Error('User already exists');
    }

    return next();
  }
}
