import { useAppContext } from '../context/AppContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useState } from 'react';

export default function Balance() {
  const [state, setState] = useAppContext() as any;
  const [show, setShow] = useState(true);

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <div className='bg-white rounded p-3 m-2 w-5/12 h-72 text-2xl'>
      <div className='flex justify-between'>
        <h2>Saldo</h2>
        <button onClick={() => setShow(!show)}>
          {show === true ? (
            <BsFillEyeFill size={22} />
          ) : (
            <BsFillEyeSlashFill size={22} />
          )}
        </button>
      </div>
      <div className='flex justify-between h-8 items-center'>
        <h2 className='mr-2'>
          {show === true ? priceFormat.format(state.balance / 100) : 'R$ ****'}
        </h2>
      </div>
    </div>
  );
}
