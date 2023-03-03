import { useAppContext } from '../context/AppContext';
import { CgProfile, CgFileDocument } from 'react-icons/cg';
import { BsGear } from 'react-icons/bs';
import { BiPaint } from 'react-icons/bi';
import { MdMoney } from 'react-icons/md';
import { GiPayMoney } from 'react-icons/gi';
import { AiOutlineNotification } from 'react-icons/ai';
import Link from 'next/link';

function ButtonWithIcon({ icon, text }: { icon: any; text: string }) {
  return (
    <button className='flex items-center gap-2 hover:bg-gray-100 p-2 rounded'>
      {icon}
      {text}
    </button>
  );
}

export default function ProfileComponent() {
  const [state, setState] = useAppContext() as any;

  return (
    <div className='bg-white rounded p-2 m-2 flex flex-col h-screen'>
      <div className='flex gap-1'>
        <Link href='/profile'>
          <img
            src='https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1.png'
            alt=''
            className='rounded-full w-14 h-14 object-cover'
          />
        </Link>

        <div className='m-auto'>
          <h1>{state.username}</h1>
          <p>Configurações da sua conta</p>
        </div>
      </div>

      <hr className='my-3' />

      <div className='flex flex-col'>
        <ButtonWithIcon icon={<CgProfile />} text='Perfil' />
        <ButtonWithIcon icon={<BsGear />} text='Conta' />
        <ButtonWithIcon icon={<BiPaint />} text='Aparência' />
      </div>

      <hr className='my-3' />

      <div className='flex flex-col'>
        <ButtonWithIcon icon={<MdMoney />} text='Pix' />
        <ButtonWithIcon icon={<AiOutlineNotification />} text='Notificação' />
        <ButtonWithIcon icon={<GiPayMoney />} text='Meus Limites' />
        <ButtonWithIcon icon={<CgFileDocument />} text='Documentos' />
      </div>

      <hr className='my-3' />
    </div>
  );
}
