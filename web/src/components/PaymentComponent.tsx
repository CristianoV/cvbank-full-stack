import { FormEvent, useCallback, useEffect, useState } from 'react';
import { fetchFromApi } from '../lib/axios';

export default function PaymentComponent() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const transaction = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
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
        className='flex flex-col justify-center items-center gap-4 w-5/6 m-auto p-3'
      >
        <label htmlFor='name' className='flex flex-col w-3/5'>
          Boleto
          <input
            className='border border-[#001813] rounded-md p-1 h-11 shadow-md'
            type='number'
            placeholder='Numero do boleto'
            required
            id='name'
            value={value}
            onChange={(event) => setValue(String(event.target.value))}
          />
        </label>
        <button
          className={`bg-bank-primary rounded-lg min-w-fit w-3/12 h-11 text-white 
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
    </div>
  );
}
