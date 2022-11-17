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
  (request: Request, response: Response) =>
    transactionController.transaction(request, response)
);

TransactionRoutes.get(
  '/',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    transactionController.getTransactions(request, response)
);

export default TransactionRoutes;
