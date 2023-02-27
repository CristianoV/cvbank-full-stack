import { useAppContext } from '../context/AppContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useState } from 'react';

export default function Balance() {
  const [state, setState] = useAppContext() as any;
  const [show, setShow] = useState(false);

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <div className='bg-white rounded p-3 m-2 text-2xl flex justify-between w-full'>
      <p className='mr-2 font-bold mt-3'>
        Saldo:
        <span className={`mt-4 ml-3 font-bold`}>
          {show === true ? priceFormat.format(state.balance / 100) : 'R$ ****'}
        </span>
      </p>
      <button onClick={() => setShow(!show)}>
        {show === true ? (
          <BsFillEyeFill size={22} />
        ) : (
          <BsFillEyeSlashFill size={22} />
        )}
      </button>
    </div>
  );
}
