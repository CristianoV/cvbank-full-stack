import Boleto from '../database/models/boleto';
import User from '../database/models/user';
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
  public async getAllBoletosByUser(authorization: string) {
    const { id } = JwtSecret.verify(authorization) as { id: number };

    const boletos = await Boleto.findAll({
      where: {
        accountId: id,
      },
      order: [['id', 'DESC']],
    });

    return boletos;
  }

  public async getBoletoById(boletoId: string) {
    const boleto = await Boleto.findOne({
      where: {
        boletoId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
      ],
    });

    if (!boleto) {
      throw new Error('Boleto não encontrado');
    }

    if (boleto.status === 'Pago') {
      throw new Error('Boleto já foi pago');
    }

    const obj = {
      id: boleto?.id,
      boletoId: boleto?.boletoId,
      accountId: boleto?.user.username,
      value: boleto?.value,
      status: boleto?.status,
      createdAt: boleto?.createdAt,
    };
    return obj;
  }
}
