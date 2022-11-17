import { NextFunction, Request, Response } from 'express';
import JwtSecret from '../utils/JwtService';
import Account from '../database/models/user';

export default class UserMiddleware {
  public async checkUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { authorization } = req.headers as { authorization: string };

    const { username } = JwtSecret.verify(authorization) as {
      username: string;
    };

    const user = await Account.findOne({
      where: {
        username,
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    if (!user) {
      return res.status(400).json({ message: 'User not authorized' });
    }

    return next();
  }
}
