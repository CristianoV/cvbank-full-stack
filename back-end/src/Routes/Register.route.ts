import { Request, Response, Router } from 'express';
import UserModel from "../database/models/user";
import UserService from "../Services/register.service";
import RegisterController from '../Controllers/register.controller';
import UserMiddleware from '../middleware/user.middleware';

const RegisterRoutes: Router = Router();
const registerService = new UserService(UserModel);
const registerController = new RegisterController(registerService);
const userMiddleware = new UserMiddleware();


RegisterRoutes.post('/', userMiddleware.checkUserExists, (request: Request, response: Response) =>
registerController.register(request, response)
);

export default RegisterRoutes;
