import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import Input from './Input';

export default function NewTransaction() {
  const [state, setState] = useAppContext() as any;
  const [error, setError] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [value, setValue] = useState(0);
  const [user, setUser] = useState({} as { price: string });
  const [loading, setLoading] = useState(false);
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  useEffect(() => {
    const priceFormat = () => {
      const { price } = user;
      if (price) {
        const priceNumber = Number(price.replace(/\D/g, ''));
        setValue(Number(priceNumber));
      }
    };
    priceFormat();
  }, [user]);

  const transaction = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      const response = await fetchFromApi.post(
        '/transaction/pix',
        { pixKey, value },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { data } = response;

      if (!data.error) {
        setPixKey('');
        setUser({ price: '' });
        setValue(0);
        setState({ ...state, newTransaction: true, newBalance: true });
      }

      setError(data.error);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [user]
  );

  if (!state.pixKey) return null;

  return (
    <div className='bg-white rounded p-1 m-2'>
      <form
        // onSubmit={transaction}
        className='flex flex-col justify-center items-center m-6 gap-4'
      >
        <label htmlFor='name' className='flex flex-col'>
          Pix
          <input
            className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
            type='input'
            placeholder='Adicione a Chave Pix'
            id='name'
            value={pixKey}
            onChange={(event) => setPixKey(event.target.value)}
          />
        </label>
        <Input
          name='price'
          mask='currency'
          // prefix='R$'
          placeholder='R$ 0,00'
          value={user.price}
          onChange={handleChange}
        />
        <button
          className={`bg-bank-primary rounded-lg min-w-fit w-80  h-11 text-white 
        ${
          loading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-bank-secondary hover:opacity-95 transition-all duration-300 ease-in-out'
        }`}
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
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
            <span>Transferir</span>
          )}
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
                Você tem certeza que deseja efetuar essa transação?
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Valor a ser transferido {priceFormat.format(value / 100)}
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
