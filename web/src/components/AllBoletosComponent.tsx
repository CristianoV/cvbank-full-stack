import { useEffect, useState } from 'react';
import { fetchFromApi } from '../lib/axios';

interface Props {
  id: string;
  boletoId: string;
  value: number;
  status: string;
  createdAt: string;
}

export default function AllBoletosComponent() {
  const [boletos, setboletos] = useState<Props[]>([]);
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    const allBoletos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetchFromApi.get('/boleto/user', {
        headers: {
          Authorization: token,
        },
      });
      setboletos(response.data);
    };
    allBoletos();
  }, []);

  return (
    <div className='bg-white p-3 mx-2 rounded'>
      <h1 className='text-2xl text-center m-3'>Seus Boletos</h1>
      <div className='flex flex-wrap gap-1 justify-center desktop:justify-start'>
        {boletos.length ? (
          boletos.map((boleto) => {
            return (
              <div
                key={boleto.id}
                className='justify-center flex flex-col'
              >
                <div className='bg-gray-200 rounded px-4 py-2'>
                  <p className=''>
                    Codigo de barra:{' '}
                    <span className='ml-1'>{boleto.boletoId}</span>
                  </p>
                  <p className=''>
                    Valor a ser pago:
                    <span className='ml-1'>
                      {priceFormat.format(boleto.value / 100)}
                    </span>
                  </p>
                  <p className=''>
                    Estado do boleto:
                    <span
                      className={`ml-1 ${
                        boleto.status === 'Pago'
                          ? 'text-success'
                          : 'text-danger'
                      }`}
                    >
                      {boleto.status}
                    </span>
                  </p>
                  <p className=''>
                    Data:
                    <span className='ml-1'>
                      {new Date(boleto.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center'>
            Você ainda não tem nenhum Boleto gerado!
          </p>
        )}
      </div>
    </div>
  );
}
