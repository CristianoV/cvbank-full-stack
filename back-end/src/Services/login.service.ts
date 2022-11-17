import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';
import Bcrypt from '../utils/BcriptService';
import { ILoginData, loginSchema } from '../Interfaces/IData/ILoginData';
import { ILoginService } from '../Interfaces/IService/ILoginService';
import { IToken } from '../Interfaces/IToken';
import { IError } from '../Interfaces/IError';

export default class LoginService implements ILoginService {
  constructor(private model: typeof User) {}

  public async login({
    username,
    password,
  }: ILoginData): Promise<IToken | IError> {
    const parsed = loginSchema.safeParse({ username, password });

    if (!parsed.success) {
      const { message } = parsed.error;
      const teste = JSON.parse(message);
      const x = teste[0].message;

      return { error: x };
    }

    const user = await this.model.findOne({
      where: {
        username,
      },
      raw: true,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const verifyPassword = Bcrypt.compare(user.password, password);

    if (!verifyPassword) throw new Error('Incorrect email or password');

    const token = JwtSecret.sign({ id: user.id, username: user.username });

    return { token };
  }
}
