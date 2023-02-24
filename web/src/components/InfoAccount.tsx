import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchFromApi } from '../lib/axios';
import Link from 'next/link';

interface IAccountData {
  balance: number;
  id: number;
  username: string;
}

export default function InfoAccount() {
  const [state, setState] = useAppContext() as any;
  const router = useRouter();

  const logout = () => {
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
              id,
            } = data;

            setState({ ...state, id, username, balance, newBalance: false });
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

  return (
    <header className='bg-bank-primary text-bank-quaternary'>
      <div className='flex justify-between items-center h-16 w-full max-w-screen-xl mx-auto'>
        <div className='mx-1'>
          <Link href='/'>
            <h1 className='text-4xl font-bold transition duration-500 ease-in-out animate-pulse'>
              NGBANCO<span className='text-violet-500'>.</span>
            </h1>
          </Link>
        </div>
        <div className='dropdown mx-2'>
          <button
            className='btn-secondary dropdown-toggle'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            {state.username}
          </button>
          <ul className='dropdown-menu'>
            <li className='dropdown-item'>Nome: {state.username}</li>
            <li className='dropdown-item'>Nº da conta: {state.id || '0000'}</li>
            <li>
              <Link className='dropdown-item' href='/config'>
                Configuração
              </Link>
            </li>
            <li>
              <Link className='dropdown-item' href='/profile'>
                Perfil
              </Link>
            </li>
            <li onClick={logout}>
              <button className='dropdown-item'>Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
