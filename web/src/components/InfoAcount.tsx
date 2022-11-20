import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import Link from 'next/link';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';

interface IAccountData {
  balance: number;
  id: number;
  username: string;
}

export default function InfoAcount() {
  const [state, setState] = useAppContext() as any;
  const [info, setInfo] = useState({} as IAccountData);
  const [mostrar, setMostrar] = useState(true);
  const router = useRouter();

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const loggount = () => {
    setState({
      ...state,
      token: '',
    });
    localStorage.removeItem('token');
    setState({
      token: '',
      username: '',
      balance: 0,
      transactions: [],
      newTransaction: true,
      newBalance: true,
    });
    router.push('/login');
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await fetchFromApi.get('/account', {
            headers: {
              authorization: token,
            },
          });
          const { data } = response;

          if (!data.error) {
            const {
              balance,
              user: { username },
            } = data;

            setState({ ...state, username, balance, newBalance: false });
          }
          return null;
        }
        router.push('/login');
      } catch (error) {
        router.push('/login');
      }
    };
    if (state.newBalance === true) {
      verifyToken();
    }
  }, [router, state, setState]);

  console.log('infoAcount');

  return (
    <div
      className='bg-bank-primary text-bank-quaternary flex justify-between items-center h-16 w-full
    fixed'
    >
      <div className='ml-5'>
        <h1>{state.username}</h1>
        <div className='flex justify-between h-8 items-center'>
          <h2 className='mr-2'>
            {mostrar === true
              ? priceFormat.format(state.balance / 100)
              : 'R$ ****'}
          </h2>
          <button onClick={() => setMostrar(!mostrar)}>
            {mostrar === true ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </button>
        </div>
      </div>
      <div className='flex gap-5'>
        <Link href='/account'>Início</Link>
        <Link href='/transfer'>Transferencias</Link>
        <Link href='/history'>Extrato</Link>
      </div>
      <button
        onClick={loggount}
        className='border border-bank-quaternary rounded-xl px-5 h-8 mr-5 hover:bg-bank-secondary'
      >
        Sair
      </button>
    </div>
  );
}
