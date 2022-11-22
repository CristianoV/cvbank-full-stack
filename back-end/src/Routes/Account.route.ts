import { Request, Response, Router } from 'express';
import AccountModel from "../database/models/account";
import AccountService from "../Services/account.service";
import AccountController from '../Controllers/account.controller';

const RegisterRoutes: Router = Router();
const registerService = new AccountService(AccountModel);
const registerController = new AccountController(registerService);


RegisterRoutes.get('/', (request: Request, response: Response) =>
registerController.Account(request, response)
);

export default RegisterRoutes;
