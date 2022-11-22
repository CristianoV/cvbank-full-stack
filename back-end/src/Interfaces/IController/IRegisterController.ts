import { Request, Response } from "express";

export interface IRegisterController {
  register(req: Request, res: Response): Promise<Response>;
}