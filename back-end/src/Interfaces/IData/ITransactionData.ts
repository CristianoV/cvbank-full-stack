import Account from '../../database/models/account';

export interface ITransactionTransferData {
  creditedAccountId: number;
  value: number;
  authorization: string;
}

export interface ITransactionData {
  creditedAccount: Account;
  debitedAccount: Account;
  value: number;
  type: string;
}

export interface ITransactionPixData {
  pixKey: number;
  value: number;
  authorization: string;
}
