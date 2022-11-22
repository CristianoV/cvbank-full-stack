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
import JwtSecret from '../utils/JwtService';
import { IToken } from '../Interfaces/IToken';

export default class RegisterService implements IRegisterService {
  constructor(private model: typeof User) {}

  public async registerAccount({
    balance,
  }: IRegisterAccountData): Promise<Account> {
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

  public async registerUser({
    username,
    password,
  }: RegisterData): Promise<IToken | IError> {
    const parsed = RegisterSchema.safeParse({ username, password });

    if (!parsed.success) {
      const { message } = parsed.error;
      const customMessage = JSON.parse(message);

      throw new Error(customMessage[0].message);
    }

    const { id: accountId } = await this.registerAccount({ balance: 10000 });

    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      username,
      password: encrypt,
      accountId,
    });
    const token = JwtSecret.sign({ id: user.id, username: user.username });

    return { token };
  }
}
