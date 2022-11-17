import { Request, Response } from "express";
import LoginService from "../Services/login.service";

export default class LoginController {
  constructor(private registerService: LoginService) {}

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.registerService.login({ username, password });

    return res.status(200).json(user);
  }
}
