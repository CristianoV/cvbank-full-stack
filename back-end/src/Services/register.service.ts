import User from '../database/models/user';
import Account from '../database/models/account';
import Bcrypt from '../utils/BcriptService';
import { IRegisterAccountData } from '../Interfaces/IData/IRegisterAccountData';
import {
  RegisterData,
  RegisterSchema,
} from '../Interfaces/IData/IRegisterData';
import { IError } from '../Interfaces/IError';
import { IRegisterService } from '../Interfaces/IService/IRegisterService';

export default class RegisterService implements IRegisterService {
  constructor(private model: typeof User) {}

  public async registerAccount({ balance }: IRegisterAccountData): Promise<Account> {
    const newAccount = await Account.create(
      {
        balance,
      },
      {
        raw: true,
      }
    );

    return newAccount;
  }

  public async registerUser({ username, password }: RegisterData): Promise<User | IError> {
    const parsed = RegisterSchema.safeParse({ username, password });

    if (!parsed.success) {
      const { message } = parsed.error;
      const teste = JSON.parse(message);
      const x = teste[0].message;

      return { error: x };
    }

    const { id } = await this.registerAccount({ balance: 10000 });

    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      username,
      password: encrypt,
      accountId: id,
    });
    return user;
  }
}
