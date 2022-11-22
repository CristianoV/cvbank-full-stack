import { Request, Response } from "express";
import UserService from "../Services/register.service";
import { IRegisterController } from "../Interfaces/IController/IRegisterController";

export default class RegisterController implements IRegisterController {
  constructor(private registerService: UserService) {}

  public async register(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.registerService.registerUser({ username, password });

    return res.status(201).json(user);
  }
}
