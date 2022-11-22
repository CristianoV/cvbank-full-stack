import { Request, Response } from "express";
import LoginService from "../Services/login.service";
import { ILoginController } from "../Interfaces/IController/ILoginController";

export default class LoginController implements ILoginController {
  constructor(private registerService: LoginService) {}

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.registerService.login({ username, password });

    return res.status(202).json(user);
  }
}
