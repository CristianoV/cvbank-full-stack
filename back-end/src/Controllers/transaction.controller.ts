import { Request, Response } from 'express';
import TransactionService from '../Services/transaction.service';
import { ITransactionController } from '../Interfaces/IController/ITransactionController';

export default class TransactionController implements ITransactionController {
  constructor(private registerService: TransactionService) {}

  public async createTransaction(req: Request, res: Response) {
    const { username, value } = req.body;
    const { authorization } = req.headers as { authorization: string };

    const user = await this.registerService.newTransaction({
      username,
      value,
      authorization,
    });

    return res.status(201).json(user);
  }

  public async getTransactions(req: Request, res: Response) {
    const { authorization } = req.headers;

    const transactions = await this.registerService.getTransactions(
      authorization as string
    );

    return res.status(202).json(transactions);
  }

  public async getTransactionsByFilter(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { date, type } = req.body;

    const transactions = await this.registerService.getTransactionsByFilter({
      authorization,
      date,
      type,
    });

    return res.status(202).json(transactions);
  }
}
