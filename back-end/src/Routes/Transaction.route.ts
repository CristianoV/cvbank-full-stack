import { Request, Response, Router } from 'express';
// import TransactionModel from "../database/models/transaction";
import TransactionService from '../Services/transaction.service';
import TransactionController from '../Controllers/transaction.controller';
import Validate from '../middleware/validate.middleware';

const TransactionRoutes: Router = Router();
const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);
const validate = new Validate();

TransactionRoutes.post(
  '/',
  validate.checkUserExists,
  validate.checkTransaction,
  (request: Request, response: Response) =>
    transactionController.createTransaction(request, response)
);

TransactionRoutes.post(
  '/pix',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    transactionController.createPixTransaction(request, response)
);

TransactionRoutes.get(
  '/all',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    transactionController.getTransactions(request, response)
);

TransactionRoutes.get(
  '/filter',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    transactionController.getTransactionsByFilter(request, response)
);

TransactionRoutes.post(
  '/boleto',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    transactionController.createBoletoTransaction(request, response)
);
export default TransactionRoutes;
