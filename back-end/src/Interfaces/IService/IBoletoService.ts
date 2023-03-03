import { IBoletoData } from '../IData/IBoletoData';
import Boletos from '../../database/models/boleto';
import { IGetBoletoById } from '../IData/IGetBoletoById';

export interface IBoletoService {
  newBoleto({ authorization, value }: IBoletoData): Promise<Boletos>;
  getAllBoletos(authorization: string): Promise<Boletos[]>;
  getAllBoletosByUser(authorization: string): Promise<Boletos[]>;
  getBoletoById(boletoId: string): Promise<IGetBoletoById>;
}
