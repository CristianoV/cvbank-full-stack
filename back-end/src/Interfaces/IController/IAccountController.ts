import { Request, Response } from "express";

export interface IAccountController {
  Account: (req: Request, res: Response) => Promise<Response>;
}