import Account from "../../database/models/account";
import User from "../../database/models/user";
import { IRegisterAccountData } from "../IData/IRegisterAccountData";
import { RegisterData } from "../IData/IRegisterData";
import { IError } from "../IError";

export interface IRegisterService {
  registerAccount({balance}: IRegisterAccountData): Promise<Account>;
  registerUser({username, password}: RegisterData): Promise<User | IError>;
}