import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import Input from './Input';

export default function PaymentComponent() {
  const [state, setState] = useAppContext() as any;
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);
  const [usuario, setUsuario] = useState({} as { price: string });
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    const priceFormat = () => {
      const { price } = usuario;
      if (price) {
        const priceNumber = Number(price.replace(/\D/g, ''));
        setValue(Number(priceNumber));
      }
    };
    priceFormat();
  }, [usuario]);

  const transaction = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetchFromApi.post(
        '/transaction',
        { username, value },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { data } = response;

      if (!data.error) {
        setUsername('');
        setUsuario({ price: '' });
        setValue(0);
        setState({ ...state, newTransaction: true, newBalance: true });
      }

      setError(data.error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUsuario({
        ...usuario,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [usuario]
  );

  return (
    <div className='bg-white rounded p-1 m-2'>
      <form
        // onSubmit={transaction}
        className='flex flex-col justify-center items-center m-6 gap-4'
      >
        <label htmlFor='name' className='flex flex-col'>
          Boleto
          <input
            className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
            type='number'
            placeholder='Numero do boleto'
            id='name'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button
          className='bg-bank-primary rounded-lg w-80 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
        >
          Pagar
        </button>
      </form>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Você tem certeza que deseja adicionar essa transação?
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Valor: {priceFormat.format(value / 100)} | Nome: {username}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='bg-bank-primary rounded-lg w-40 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
                data-bs-dismiss='modal'
              >
                Cancelar
              </button>
              <button
                type='button'
                className='bg-bank-primary rounded-lg w-40 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
                data-bs-dismiss='modal'
                onClick={transaction}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
