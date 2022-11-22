import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import Input from './Input';

export default function NewTransaction() {
  const [state, setState] = useAppContext() as any;
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);
  const [usuario, setUsuario] = useState({} as { price: string });

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
    <div className='pt-16'>
      <form
        onSubmit={transaction}
        className='flex flex-col justify-center items-center m-6 gap-4'
      >
        <label htmlFor='name' className='flex flex-col'>
          Nome
          <input
            className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
            type='input'
            placeholder='Creditado'
            id='name'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <Input
          name='price'
          mask='currency'
          // prefix='R$'
          placeholder='R$ 0,00'
          value={usuario.price}
          onChange={handleChange}
        />
        <button
          className='bg-bank-primary rounded-lg w-80 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
          type='submit'
        >
          Transferir
        </button>
      </form>
    </div>
  );
}
