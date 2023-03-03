import { IUser } from "./IUser";

export interface ITransaction {
  createdAt: string;
  creditedUser: IUser;
  debitedUser: IUser;
  id: number;
  value: number;
  type: string;
}