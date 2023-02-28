import { useAppContext } from '../context/AppContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { IoStorefrontOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function BalanceComponent() {
  const [state, setState] = useAppContext() as any;
  const [show, setShow] = useState(false);

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return (
    <div className='bg-white rounded p-3  m-2 mobile:w-6/12 mobile:h-72 text-2xl'>
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
      <div className='flex flex-col h-5/6 justify-between'>
        <h2 className='mr-2 font-bold mt-3'>
          {show === true ? priceFormat.format(state.balance / 100) : 'R$ ****'}
        </h2>
        <div>
          <h1>Vendas a receber</h1>
          <p className='flex items-center gap-3 font-bold'>
            <IoStorefrontOutline size={22} />{' '}
            {show === true ? 'R$ 0,00' : 'R$ ****'}
          </p>
        </div>
        <div>
          <h1>Bloqueado</h1>
          <p className='font-bold'>{show === true ? 'R$ 0,00' : 'R$ ****'}</p>
        </div>
      </div>
    </div>
  );
}
