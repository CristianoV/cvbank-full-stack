import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import TransactionCells from '../components/TransactionCells';
import Loading from './Loading';
import { IContext } from '../interfaces/IData/IContext';
import { ITransaction } from '../interfaces/IData/ITransaction';

export default function TransactionTable() {
  const [state, setState] = useAppContext() as unknown as [
    IContext,
    (state: IContext) => void
  ];

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const transactions = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetchFromApi.get('/transaction/all', {
          headers: {
            authorization: token,
          },
        });
        const { data } = response;
        setState({ ...state, transactions: data, newTransaction: false });
        setLoading(false);
        return null;
      }
      router.push('/login');
    };
    if (state.newTransaction === true) {
      transactions();
    }
  }, [router, state, setState]);

  useEffect(() => {
    return () => {
      if (state.newTransaction === false) {
        setState({ ...state, newTransaction: true });
      }
    };
  }, []);

  const filteredTransactions = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      if (token) {
        const response = await fetchFromApi.post(
          '/transaction/filter',
          { date, type: filter },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { data } = response;

        setState({ ...state, transactions: data });
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col bg-white rounded p-1 m-2 h-72'>
      <form
        onSubmit={filteredTransactions}
        className='flex items-end m-6 gap-4 justify-center'
      >
        <label htmlFor='data' className='flex flex-col items-center w-3/12'>
          Selecione o dia
          <input
            className='border border-[#001813] w-full rounded-md p-1 h-11 shadow-md cursor-pointer'
            type='date'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            required
            name=''
            id='data'
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </label>
        <label htmlFor='' className='flex flex-col items-center w-3/12 '>
          Tipo de Transação
          <select
            name=''
            id=''
            className='border border-[#001813] w-full rounded-md p-1 h-11 shadow-md cursor-pointer'
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value='1'>Selecione uma opção</option>
            <option value='1'>Todas</option>
            <option value='debit'>Transferido</option>
            <option value='credit'>Depositado</option>
          </select>
        </label>
        <button
          className={`bg-bank-primary rounded-lg  w-3/12 h-11 text-white 
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
            <span>Pesquisar</span>
          )}
        </button>
      </form>
      <div className='overflow-x-auto  w-full  h-50'>
        <table border={1} className='border border-black mx-auto my-15 w-11/12'>
          <thead>
            <tr className='bg-bank-primary text-white text-center'>
              <th>VALOR</th>
              <th className='hidden mobile:block'>TIPO</th>
              <th>CREDITADO</th>
              <th className='hidden mobile:block'>DEBITADO</th>
              <th>DATA</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              state.transactions.map(
                (
                  {
                    createdAt,
                    value,
                    id,
                    creditedUser,
                    debitedUser,
                    type,
                  }: ITransaction,
                  index: Key
                ) => {
                  return (
                    <TransactionCells
                      createdAt={createdAt}
                      value={value}
                      creditedUser={creditedUser}
                      debitedUser={debitedUser}
                      id={id}
                      type={type}
                      key={index}
                    />
                  );
                }
              )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className='mx-auto mb-28'>
          <Loading size={6} />
        </div>
      )}
    </div>
  );
}
