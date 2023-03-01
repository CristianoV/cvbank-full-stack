import { Request, Response } from 'express';
import TransactionService from '../Services/transaction.service';
import { ITransactionController } from '../Interfaces/IController/ITransactionController';

export default class TransactionController implements ITransactionController {
  constructor(private registerService: TransactionService) {}

  public async createTransaction(req: Request, res: Response) {
    const { creditedAccountId, value } = req.body;
    const { authorization } = req.headers as { authorization: string };

    const user = await this.registerService.transferTransaction({
      creditedAccountId,
      value,
      authorization,
    });

    return res.status(201).json(user);
  }

  public async createPixTransaction(req: Request, res: Response) {
    const { pixKey, value } = req.body;
    const { authorization } = req.headers as { authorization: string };

    const user = await this.registerService.pixTransaction({
      pixKey,
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

  public async paymentBoletoTransaction(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { boletoId } = req.body;

    const boleto = await this.registerService.boletoTransaction({
      authorization,
      boletoId,
    });

    return res.status(202).json(boleto);
  }
}
