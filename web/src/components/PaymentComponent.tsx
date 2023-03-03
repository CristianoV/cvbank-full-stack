import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
interface Props {
  accountId: string;
  boletoId: string;
  value: number;
  status: string;
  createdAt: string;
}

export default function PaymentComponent() {
  const [boletoId, setBoletoId] = useState('');
  const [transactionData, setTransactionData] = useState<Props>();
  const [state, setState] = useAppContext() as any;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const getTransaction = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetchFromApi.get(`/boleto/${boletoId}`, {
        headers: {
          Authorization: token,
        },
      });
      setTransactionData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const transaction = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetchFromApi.post(
        '/transaction/boleto',
        { boletoId },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { data } = response;

      if (!data.error) {
        setBoletoId('');
        setTransactionData(undefined);
        setState({ ...state, newTransaction: true, newBalance: true });
      }

      setError(data.error);
    } catch (error) {
      console.error(error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white rounded p-1 m-2'>
      {!transactionData && (
        <form
          onSubmit={getTransaction}
          className='flex flex-col justify-center items-center m-6 gap-4'
        >
          <label htmlFor='name' className='flex flex-col'>
            Boleto
            <input
              className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
              type='number'
              placeholder='Numero do boleto'
              required
              id='name'
              value={boletoId}
              onChange={(event) => setBoletoId(String(event.target.value))}
            />
          </label>
          <button
            className={`bg-bank-primary rounded-lg min-w-fit w-80  h-11 text-white 
              ${
                loading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-bank-secondary hover:opacity-95 transition-all duration-300 ease-in-out'
              }`}
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3z'
                  />
                </svg>
                <span>Carregando...</span>
              </div>
            ) : (
              <span>Pagar</span>
            )}
          </button>
        </form>
      )}
      {transactionData && (
        <div className='w-full justify-center flex flex-col items-center p-5'>
          <div className='bg-white rounded p-2'>
            <h1 className='mb-3 font-bold'>
              Você gostaria de pagar esse boleto?
            </h1>
            <p className=''>
              Codigo de barra:{' '}
              <span className='ml-1'>{transactionData.boletoId}</span>
            </p>
            <p className=''>
              Valor a ser pago:
              <span className='ml-1'>
                {priceFormat.format(transactionData.value / 100)}
              </span>
            </p>
            <p className=''>
              Estado do boleto:
              <span className='ml-1'>{transactionData.status}</span>
            </p>
            <p className=''>
              Boleto criado por:
              <span className='ml-1'>{transactionData.accountId}</span>
            </p>
            <p className=''>
              Data:
              <span className='ml-1'>
                {new Date(transactionData.createdAt).toLocaleDateString(
                  'pt-BR'
                )}
              </span>
            </p>
          </div>
          <button
            className={`bg-bank-primary mb-3 rounded-lg min-w-fit w-80  h-11 text-white 
        ${
          loading || transactionData.accountId === state.username
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-bank-secondary hover:opacity-95 transition-all duration-300 ease-in-out'
        }`}
            type='button'
            disabled={loading || transactionData.accountId === state.username}
            onClick={transaction}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3z'
                  />
                </svg>
                <span>Carregando...</span>
              </div>
            ) : (
              <span>Confirmar</span>
            )}
          </button>
          {transactionData.accountId === state.username && (
            <p className='text-danger'>
              Você não pode pagar um boleto criado por você mesmo
            </p>
          )}
        </div>
      )}
    </div>
  );
}
