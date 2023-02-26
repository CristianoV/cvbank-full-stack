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
    creditedAccountId,
    authorization,
    value,
  }: ITransactionData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };
  
    const creditedAccount = await Account.findOne({
      include: [
        {
          model: User,
          as: 'user',
          where: { id: creditedAccountId },
        },
      ],
    });
  
    if (!creditedAccount) {
      throw new Error('Credited account not found');
    }
  
    const debitedAccount = await Account.findByPk(id);
  
    if (!debitedAccount) {
      throw new Error('Debited account not found');
    }
  
    const transaction = await Transaction.create({
      creditedAccountId: creditedAccount.id,
      debitedAccountId: debitedAccount.id,
      value,
    });
  
    const newDebitedBalance = Number(debitedAccount.balance) - Number(value);
    const newCreditedBalance = Number(creditedAccount.balance) + Number(value);
  
    await Promise.all([
      debitedAccount.update({ balance: newDebitedBalance }),
      creditedAccount.update({ balance: newCreditedBalance }),
    ]);
  
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
