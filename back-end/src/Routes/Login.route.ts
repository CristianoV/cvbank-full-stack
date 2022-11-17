import { Request, Response, Router } from 'express';
import UserModel from "../database/models/user";
import UserService from "../Services/login.service";
import RegisterController from '../Controllers/login.controller';

const RegisterRoutes: Router = Router();
const registerService = new UserService(UserModel);
const registerController = new RegisterController(registerService);


RegisterRoutes.post('/', (request: Request, response: Response) =>
registerController.login(request, response)
);

export default RegisterRoutes;
