import { Request, Response } from "express";
import AccountService from "../Services/account.service";
import { IAccountController } from "../Interfaces/IController/IAccountController";

export default class AccountController implements IAccountController {
  constructor(private registerService: AccountService) {}

  public async Account(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const user = await this.registerService.account(authorization);

    return res.status(200).json(user);
  }
}
