import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiHomeAlt, BiTransfer } from 'react-icons/bi';
import {
  MdOutlineRequestPage,
  MdPayments,
  MdMoney,
  MdOutlinePayment,
} from 'react-icons/md';

const input = 'flex items-center gap-3 p-2 hover:text-blue-500';

const inputSelect =
  'flex items-center gap-3 bg-gray-200 p-2 hover:text-blue-500 rounded';

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.asPath === href;
  const linkClass = isActive ? inputSelect : input;
  return (
    <Link href={href}>
      <p className={linkClass}>{children}</p>
    </Link>
  );
}

export default function LeftNavBar() {
  return (
    <div className='flex flex-col w-3/12 h-screen bg-white rounded p-1 m-2'>
      <div className='flex flex-col h-full mt-4 m-10 text-2xl gap-4'>
        <NavLink href='/account'>
          <BiHomeAlt />
          Pagina inicial
        </NavLink>
        <NavLink href='/history'>
          <MdOutlineRequestPage />
          Extrato
        </NavLink>
        <NavLink href='/payment'>
          <MdPayments />
          Pagamento
        </NavLink>
        <NavLink href='/transfer'>
          <BiTransfer />
          Transferencia
        </NavLink>
        <NavLink href='/pix'>
          <MdMoney />
          Pix
        </NavLink>
        <NavLink href='/generate'>
          <MdOutlinePayment />
          Gerar Boleto
        </NavLink>
      </div>
    </div>
  );
}
