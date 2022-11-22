import { ITransaction } from "./ITransaction";

export interface IContext {
  token: String;
  username: String;
  balance: Number;
  transactions: ITransaction[];
  newTransaction: Boolean;
  newBalance: Boolean;
}
