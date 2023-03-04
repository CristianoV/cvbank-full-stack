import { IFilterData } from '../IData/IFilterData';
import Transaction from '../../database/models/transaction';
import {
  ITransactionData,
  ITransactionTransferData,
  ITransactionPixData,
} from '../IData/ITransactionData';

export interface ITransactionService {
  executeTransaction({
    creditedAccount,
    debitedAccount,
    value,
  }: ITransactionData): Promise<Transaction>;
  boletoTransaction({
    authorization,
    boletoId,
  }: {
    authorization: string;
    boletoId: string;
  }): Promise<Transaction>;
  transferTransaction({
    creditedAccountId,
    authorization,
    value,
  }: ITransactionTransferData): Promise<Transaction>;
  pixTransaction({
    pixKey,
    authorization,
    value,
  }: ITransactionPixData): Promise<Transaction>;
  getTransactions(token: string): Promise<Transaction[]>;
  getTransactionsByFilter({
    authorization,
    date,
    type,
  }: IFilterData): Promise<Transaction[]>;
}
