import { Request, Response, Router } from 'express';
import AccountModel from '../database/models/account';
import AccountService from '../Services/account.service';
import AccountController from '../Controllers/account.controller';
import Validate from '../middleware/validate.middleware';

const RegisterRoutes: Router = Router();
const registerService = new AccountService(AccountModel);
const registerController = new AccountController(registerService);
const validate = new Validate();

RegisterRoutes.get('/', (request: Request, response: Response) =>
  registerController.Account(request, response)
);

RegisterRoutes.post(
  '/pix',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    registerController.CreatePixKey(request, response)
);

export default RegisterRoutes;
