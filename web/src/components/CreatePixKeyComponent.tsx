import { useAppContext } from '../context/AppContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useState } from 'react';

export default function Balance() {
  const [state, setState] = useAppContext() as any;
  const [key, setKey] = useState('');
  const [show, setShow] = useState(true);

  const handleGenerateKey = () => {
    const key = Math.random().toString(36).substr(2, 9);
    setKey(key);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(key);
  };

  if (state.pixKey) return null;

  return (
    <div className='bg-white rounded p-3 m-2 text-2xl'>
      Você gostaria de criar uma chave pix?
      <div className='bg-gray-50 p-3 rounded'>
        <label htmlFor='Email' className='flex flex-col items-start'>
          Email
          <span className='text-sm flex gap-2 items-center text-red-500'>
            <input
              type='radio'
              name='pix'
              id='Email'
              value='Email'
              disabled={!state.email}
            />
            {!state.email ? '(Você não possui um email cadastrado)' : ''}
          </span>
        </label>
        <label htmlFor='Celular' className='flex flex-col items-start'>
          Celular
          <span className='text-sm flex gap-2 items-center text-red-500'>
            <input
              type='radio'
              name='pix'
              id='Celular'
              value='Celular'
              disabled={!state.cel}
            />
            {!state.cel ? '(Você não possui um celular cadastrado)' : ''}
          </span>
        </label>
        <label htmlFor='Aleatorio' className='flex flex-col items-start'>
          Aleatório
          <input
            type='radio'
            name='pix'
            id='Aleatorio'
            value='Aleatorio'
            onClick={handleGenerateKey}
          />
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 items-center'
      >
        <input
          className='border border-[#001813] rounded-md p-1 w-9/12 h-11 shadow-md mt-2'
          type='input'
          placeholder=''
          id=''
          value={key}
          required
        />
        <button
          className='bg-bank-primary rounded-lg w-9/12 h-11 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bank-secondary'
          type='submit'
        >
          Gerar
        </button>
      </form>
    </div>
  );
}
