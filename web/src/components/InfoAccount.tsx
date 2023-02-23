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
              id
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
    <div
      className='bg-bank-primary text-bank-quaternary flex justify-between items-center h-16 w-full
    '
    >
      <div className='ml-10'>
        <Link href='/'>
          <h1>NGBANCO</h1>
        </Link>
      </div>
      <div className='dropdown mr-10'>
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
            <a className='dropdown-item' href='#'>
              Configuração
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Perfil
            </a>
          </li>
          <li onClick={logout}>
            <button className='dropdown-item'>Sair</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
