import { Request, Response } from 'express';

export interface IBoletoController {
  createNewBoleto: (req: Request, res: Response) => Promise<Response>;
  getAllBoletos: (req: Request, res: Response) => Promise<Response>;
  getAllBoletosByUser: (req: Request, res: Response) => Promise<Response>;
  getBoletoById: (req: Request, res: Response) => Promise<Response>;
}
