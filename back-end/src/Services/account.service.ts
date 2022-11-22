import JwtSecret from '../utils/JwtService';
import Account from '../database/models/account';
import IAccountData from '../Interfaces/IData/IAccountData';
import { IAccountService } from '../Interfaces/IService/IAccountService';

export default class AccountService implements IAccountService {
  constructor(private model: typeof Account) {}

  public async account(authorization: string) {
    const { id } = JwtSecret.verify(authorization);

    const user = (await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          all: true,
          attributes: ['username'],
        },
      ],
    })) as unknown as IAccountData;

    return user;
  }
}
