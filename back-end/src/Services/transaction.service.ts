import Transaction from '../database/models/transaction';
import Account from '../database/models/account';
import JwtSecret from '../utils/JwtService';
import { Op } from 'sequelize';
import {
  ITransactionData,
  ITransactionPixData,
  ITransactionTransferData,
} from '../Interfaces/IData/ITransactionData';
import { ITransactionService } from '../Interfaces/IService/ITransactionService';
import { IFilterData } from '../Interfaces/IData/IFilterData';

export default class TransactionService implements ITransactionService {
  public async executeTransaction({
    creditedAccount,
    debitedAccount,
    value,
    type,
  }: ITransactionData) {
    const transaction = await Transaction.create({
      creditedAccountId: creditedAccount.id,
      debitedAccountId: debitedAccount.id,
      value,
      type,
    });

    const newDebitedBalance = Number(debitedAccount.balance) - Number(value);
    const newCreditedBalance = Number(creditedAccount.balance) + Number(value);

    await Promise.all([
      debitedAccount.update({ balance: newDebitedBalance }),
      creditedAccount.update({ balance: newCreditedBalance }),
    ]);

    return transaction;
  }

  public async transferTransaction({
    creditedAccountId,
    authorization,
    value,
  }: ITransactionTransferData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const creditedAccount = await Account.findByPk(creditedAccountId);

    if (!creditedAccount) {
      throw new Error('Credited account not found');
    }

    const debitedAccount = await Account.findByPk(id);

    if (!debitedAccount) {
      throw new Error('Debited account not found');
    }

    return this.executeTransaction({
      creditedAccount,
      debitedAccount,
      value,
      type: 'Transferencia',
    });
  }

  public async pixTransaction({
    pixKey,
    authorization,
    value,
  }: ITransactionPixData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const creditedAccount = await Account.findOne({
      where: {
        pixKey,
      },
    });

    if (!creditedAccount) {
      throw new Error('Credited account not found');
    }

    const debitedAccount = await Account.findByPk(id);

    if (!debitedAccount) {
      throw new Error('Debited account not found');
    }

    return this.executeTransaction({
      creditedAccount,
      debitedAccount,
      value,
      type: 'Pix',
    });
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
      order: [['createdAt', 'DESC'], ['id', 'DESC']],
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
      order: [['createdAt', 'DESC'], ['id', 'DESC']],
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
