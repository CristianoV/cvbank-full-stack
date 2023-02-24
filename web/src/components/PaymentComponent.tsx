import { FormEvent, useCallback, useEffect, useState } from 'react';
import { fetchFromApi } from '../lib/axios';

export default function PaymentComponent() {
  const [value, setValue] = useState('');

  const transaction = (event: FormEvent) => {
    event.preventDefault();
    console.log('transaction');
  };

  // const transaction = async (event: FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetchFromApi.post(
  //       '/transaction',
  //       { username, value },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     const { data } = response;

  //     if (!data.error) {
  //       setUsername('');
  //       setUsuario({ price: '' });
  //       setValue(0);
  //       setState({ ...state, newTransaction: true, newBalance: true });
  //     }

  //     setError(data.error);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='bg-white rounded p-1 m-2'>
      <form
        onSubmit={transaction}
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
            value={value}
            onChange={(event) => setValue(String(event.target.value))}
          />
        </label>
        <button
          className='bg-bank-primary rounded-lg w-80 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
          type='submit'
        >
          Pagar
        </button>
      </form>
    </div>
  );
}
