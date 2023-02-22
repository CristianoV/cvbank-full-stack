import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiHomeAlt, BiTransfer } from 'react-icons/bi';
import {
  MdOutlineRequestPage,
  MdPayments,
  MdMoney,
  MdOutlinePayment,
} from 'react-icons/md';

const input = 'flex items-center gap-5 p-2';

const inputSelect = 'flex items-center gap-5 bg-gray-200 p-2';

export default function LeftNavBar() {
  const router = useRouter();
  return (
    <div className='flex flex-col w-3/12 h-screen bg-white rounded p-1 m-2'>
      <div className='flex flex-col h-full mt-4 m-10 text-2xl gap-4'>
        <Link
          href='/account'
          className={router.asPath === '/account' ? inputSelect : input}
        >
          <BiHomeAlt />
          Pagina inicial
        </Link>
        <Link
          href='/history'
          className={router.asPath === '/history' ? inputSelect : input}
        >
          <MdOutlineRequestPage />
          Extrato
        </Link>
        <Link
          href='/payment'
          className={router.asPath === '/payment' ? inputSelect : input}
        >
          <MdPayments />
          Pagamento
        </Link>
        <Link
          href='/transfer'
          className={router.asPath === '/transfer' ? inputSelect : input}
        >
          <BiTransfer />
          Transferencia
        </Link>
        <Link
          href='/pix'
          className={router.asPath === '/pix' ? inputSelect : input}
        >
          <MdMoney />
          Pix
        </Link>
        <Link
          href='/generate'
          className={router.asPath === '/generate' ? inputSelect : input}
        >
          <MdOutlinePayment />
          Gerar Boleto
        </Link>
      </div>
    </div>
  );
}
