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
  'flex items-center gap-3 desktop:bg-gray-200 p-2 hover:text-blue-500 rounded underline text-blue-500 desktop:text-black';

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
    <div className='flex flex-col bottom-0 desktop:w-72 desktop:h-screen desktop:bg-white rounded p-1 desktop:m-2 fixed desktop:relative bg-gray-100'>
      <div className='flex flex-wrap justify-center desktop:justify-start desktop:flex-col desktop:h-full desktop:mt-4 desktop:m-10 desktop:text-2xl desktop:gap-4 desktop:flex-wrap'>
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
