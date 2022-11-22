import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import TransactionCells from '../components/TransactionCells';
import Loading from './Loading';
import { IContext } from '../interfaces/IData/IContext';
import { ITransaction } from '../interfaces/IData/ITransaction';

export default function TransactionTable() {
  const [state, setState] = useAppContext() as unknown as [IContext,
    (state: IContext) => void];

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

  const filteredTransactions = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
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
    router.push('/login');
  };

  return (
    <div className='flex flex-col justify-center pt-16'>
      <form
        onSubmit={filteredTransactions}
        className='flex justify-center items-end m-6 gap-4'
      >
        <label htmlFor='data' className='flex flex-col items-center'>
          Selecione o dia
          <input
            className='border border-[#001813] rounded-md p-1 w-60 h-11 shadow-md'
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
        <label htmlFor='' className='flex flex-col items-center'>
          Tipo de Transação
          <select
            name=''
            id=''
            className='border border-[#001813] rounded-md p-1 w-60 h-11 shadow-md'
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
          className='bg-bank-primary rounded-lg w-60 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
          type='submit'
        >
          Pesquisar
        </button>
      </form>

      <table border={1} className='border border-black mx-auto mb-28 w-6/12'>
        <thead>
          <tr>
            <th>VALOR</th>
            <th>Creditado</th>
            <th>DEBITADO</th>
            <th>DATA</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            state.transactions.map(
              (
                { createdAt, value, id, creditedUser, debitedUser }: ITransaction,
                index: Key
              ) => {
                return (
                  <TransactionCells
                    createdAt={createdAt}
                    value={value}
                    creditedUser={creditedUser}
                    debitedUser={debitedUser}
                    id={id}
                    key={index}
                  />
                );
              }
            )}
        </tbody>
      </table>
      {loading && (
        <div className='mx-auto mb-28'>
          <Loading size={6} />
        </div>
      )}
    </div>
  );
}
