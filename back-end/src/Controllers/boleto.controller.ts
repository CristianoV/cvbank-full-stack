import { Request, Response } from 'express';
import BoletoService from '../Services/boleto.service';

export default class TransactionController {
  constructor(private boletoService: BoletoService) {}

  public async createNewBoleto(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { value } = req.body;

    const newBoleto = await this.boletoService.newBoleto({
      authorization,
      value,
    });

    return res.status(202).json(newBoleto);
  }

  public async getAllBoletos(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const boletos = await this.boletoService.getAllBoletos(authorization);

    return res.status(200).json(boletos);
  }

  public async getAllBoletosByUser(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    console.log(authorization);
    
    const boletos = await this.boletoService.getAllBoletosByUser(authorization);

    return res.status(200).json(boletos);
  }

  public async getBoletoById(req: Request, res: Response) {
    const { boletoId } = req.params;

    const boleto = await this.boletoService.getBoletoById(boletoId);

    return res.status(200).json(boleto);
  }
}
