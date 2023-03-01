import Boleto from '../database/models/boleto';
import Account from '../database/models/account';
import JwtSecret from '../utils/JwtService';
import generateRandomEAN13 from '../utils/GenerateRandomEAN13';

interface IBoletoData {
  authorization: string;
  value: number;
}

export default class TransactionService {
  public async newBoleto({ authorization, value }: IBoletoData) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const boleto = await Boleto.create({
      boletoId: generateRandomEAN13(),
      accountId: id,
      value,
      status: 'Pendente',
    });

    return boleto;
  }

  public async getAllBoletos(authorization: string) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const boletos = await Boleto.findAll({
      where: {
        accountId: id,
      },
    });

    return boletos;
  }
}
