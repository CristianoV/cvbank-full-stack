import Transaction from '../database/models/transaction';
import Account from '../database/models/account';
import JwtSecret from '../utils/JwtService';
import { Op } from 'sequelize';
import { ITransactionData } from '../Interfaces/IData/ITransactionData';
import User from '../database/models/user';
import { ITransactionService } from '../Interfaces/IService/ITransactionService';
import { IFilterData } from '../Interfaces/IData/IFilterData';

export default class TransactionService implements ITransactionService {
  public async newTransaction({
    username,
    authorization,
    value,
  }: ITransactionData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const { balance: balanceCreditedAccountId, id: creditedAccountId } =
      (await Account.findOne({
        include: [
          {
            model: User,
            as: 'user',
            where: { username },
          },
        ],
        raw: true,
      })) as { balance: number; id: number };

    const { balance: balanceDebitedAccountId, id: debitedAccountId } =
      (await Account.findOne({
        where: { id },
        raw: true,
      })) as { balance: number; id: number };

    const transaction = await Transaction.create({
      creditedAccountId,
      debitedAccountId,
      value,
    });

    await Account.update(
      { balance: balanceDebitedAccountId - value },
      { where: { id: debitedAccountId } }
    );

    await Account.update(
      { balance: balanceCreditedAccountId + value },
      { where: { id: creditedAccountId } }
    );

    return transaction;
  }

  public async getTransactions(authorization: string) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }],
      },
      include: [
        {
          all: true,
          attributes: ['username'],
        },
      ],
    });

    return transactions;
  }

  public async getTransactionsByFilter({
    authorization,
    date,
    type,
  }: IFilterData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }],
        createdAt: date,
      },
      include: [
        {
          all: true,
          attributes: ['username'],
        },
      ],
    });

    if (type === 'credit') {
      return transactions.filter(
        (transaction) => transaction.creditedAccountId === id
      );
    }

    if (type === 'debit') {
      return transactions.filter(
        (transaction) => transaction.debitedAccountId === id
      );
    }

    return transactions;
  }
}
