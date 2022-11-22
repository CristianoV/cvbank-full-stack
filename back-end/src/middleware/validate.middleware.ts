import { NextFunction, Request, Response } from 'express';
import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';
import Account from '../database/models/account';

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

    const user = await User.findOne({
      where: {
        username,
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    if (!user) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    return next();
  }

  public async ckeckTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    const { value, username } = req.body;
    const { authorization } = req.headers as { authorization: string };

    const { id } = JwtSecret.verify(authorization) as { id: number };

    const { balance, id: debitedAccountId } =
      (await Account.findOne({
        where: { id },
        raw: true,
      })) as { balance: number; id: number };

      const { id: creditedAccountId } =
      (await Account.findOne({
        include: [
          {
            model: User,
            as: 'user',
            where: { username },
          },
        ],
        raw: true,
      })) as { balance: number; id: number };

    if (balance < value) {
      throw new Error('Insufficient funds');
    }

    if (creditedAccountId === debitedAccountId) {
      throw new Error('You cannot transfer to yourself');
    }

    if (value <= 0) {
      throw new Error('You cannot transfer a negative value');
    }

    return next();
  }
}
