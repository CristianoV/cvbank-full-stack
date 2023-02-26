import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchFromApi } from '../lib/axios';
import { useAppContext } from '../context/AppContext';
import ValidatePassword from '../components/ValidatePassword';
import ValidateUsername from '../components/ValidateUsername';
import { IContext } from '../interfaces/IData/IContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useAppContext() as unknown as [
    IContext,
    (state: IContext) => void
  ];

  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const SetToken = (token: string) => {
    setState({
      ...state,
      token,
    });
  };

  const userRegister = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetchFromApi.post('/register', {
        username,
        password,
      });

      const { data } = response;
      if (!data.error) {
        SetToken(data.token);
        localStorage.setItem('token', data.token);
        router.push('/account');
      }

      setError(data.error);
      setPassword('');
      setUsername('');
    } catch (error: any) {
      setLoading(false);
      const { data } = error.response;

      setError(data.error);
      setPassword('');
      setUsername('');
    }
  };

  return (
    <div>
      <form
        onSubmit={userRegister}
        className='flex justify-center flex-col items-center gap-3 bg-[#E5E5E5]
    w-96 h-96 m-auto mt-20 place-content-center font-roboto shadow-lg rounded-lg'
      >
        <label htmlFor='name' className='flex flex-col'>
          Apelido
          <input
            className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
            id='name'
            type='input'
            required
            placeholder='Seu apelido'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <ValidateUsername username={username} />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          Senha
          <input
            className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
            id='password'
            type={seePassword ? 'text' : 'password'}
            required
            placeholder='*******'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <label htmlFor='ps' className='flex gap-2'>
            <input
              type='checkbox'
              name=''
              checked={seePassword}
              id='ps'
              onChange={() => setSeePassword(!seePassword)}
            />
            Mostrar senha
          </label>
          <ValidatePassword password={password} />
        </label>
        <button
      className={`bg-bank-primary rounded-lg w-80 h-11 text-white 
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bank-secondary'}`}
      type='submit'
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3z"
            />
          </svg>
          <span>Carregando...</span>
        </div>
      ) : (
        <span>Registrar</span>
      )}
    </button>
        {error && error !== 'User already exists' && (
          <h6 className='text-danger text-sm font-bold text-center'>
            O apelido utilizado ou a senha inseridas estão incorretos. Tente
            novamente, por favor.
          </h6>
        )}
        {error === 'User already exists' && (
          <h6 className='text-danger text-sm font-bold text-center'>
            Usuario já existe, tente outro apelido.
          </h6>
        )}
      </form>
    </div>
  );
}
