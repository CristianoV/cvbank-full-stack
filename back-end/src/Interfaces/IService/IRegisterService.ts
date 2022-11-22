import Account from '../../database/models/account';
import { IRegisterAccountData } from '../IData/IRegisterAccountData';
import { RegisterData } from '../IData/IRegisterData';
import { IError } from '../IError';
import { IToken } from '../IToken';

export interface IRegisterService {
  registerAccount({ balance }: IRegisterAccountData): Promise<Account>;
  registerUser({ username, password }: RegisterData): Promise<IToken | IError>;
}
