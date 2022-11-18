import Transaction from '../database/models/transaction';
import Account from '../database/models/account';
import JwtSecret from '../utils/JwtService';
import { Op } from 'sequelize';
import { ITransactionData } from '../Interfaces/IData/ITransactionData';

export default class TransactionService {
  public async transaction({
    creditedAccountId,
    debitedAccountId,
    value,
  }: ITransactionData) {
    const { balance: balanceDebitedAccountId } = (await Account.findOne({
      where: { id: debitedAccountId },
      raw: true,
    })) as { balance: number };

    const { balance: balanceCreditedAccountId } = (await Account.findOne({
      where: { id: creditedAccountId },
      raw: true,
    })) as { balance: number };

    if (balanceDebitedAccountId < value) {
      throw new Error('Insufficient funds');
    }

    if (creditedAccountId === debitedAccountId) {
      throw new Error('You cannot transfer to yourself');
    }

    if (value <= 0) {
      throw new Error('You cannot transfer a negative value');
    }

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

  public async getCreditedTransactions(authorization: string) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const transactions = await Transaction.findAll({
      where: {
        creditedAccountId: id,
      },
      raw: true,
    });

    return transactions;
  }

  public async getDebitedTransactions(authorization: string) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const transactions = await Transaction.findAll({
      where: {
        debitedAccountId: id,
      },
      raw: true,
    });

    return transactions;
  }
}
