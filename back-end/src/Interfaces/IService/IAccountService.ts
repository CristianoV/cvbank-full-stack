import IAccountData from "../IData/IAccountData";

export interface IAccountService {
  account(authorization: string): Promise<IAccountData>;
}