import { useAppContext } from '../context/AppContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useState } from 'react';

export default function Balance() {
  const [state, setState] = useAppContext() as any;
  const [show, setShow] = useState(true);

  if (!state.pixKey) return null;

  return (
    <div className='bg-white rounded p-3 m-2 text-2xl flex justify-between'>
      <p>
        Sua chave pix:
        <span
          className={`mt-4 ml-3 font-bold`}
        >
          {show ? state.pixKey : '***'}
        </span>
      </p>
      <button onClick={() => setShow(!show)}>
        {show ? <BsFillEyeFill size={22} /> : <BsFillEyeSlashFill size={22} />}
      </button>
    </div>
  );
}
