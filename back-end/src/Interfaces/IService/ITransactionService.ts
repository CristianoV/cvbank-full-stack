import { IFilterData } from '../IData/IFilterData';
import Transaction from '../../database/models/transaction';
import { ITransactionData } from '../IData/ITransactionData';

export interface ITransactionService {
  newTransaction({
    creditedAccountId,
    authorization,
    value,
  }: ITransactionData): Promise<Transaction>;
  getTransactions(token: string): Promise<Transaction[]>;
  getTransactionsByFilter({
    authorization,
    date,
    type,
  }: IFilterData): Promise<Transaction[]>;
}
