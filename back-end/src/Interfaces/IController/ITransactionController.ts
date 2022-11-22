import { Request, Response } from 'express';

export interface ITransactionController {
  createTransaction: (req: Request, res: Response) => Promise<Response>;
  getTransactions: (req: Request, res: Response) => Promise<Response>;
  getTransactionsByFilter: (req: Request, res: Response) => Promise<Response>;
}