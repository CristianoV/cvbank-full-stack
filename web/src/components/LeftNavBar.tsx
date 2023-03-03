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
  'flex items-center gap-3 mobile:bg-gray-200 p-2 hover:text-blue-500 rounded underline text-blue-500 mobile:text-black';

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
    <div className='flex flex-col bottom-0 mobile:w-72 mobile:h-screen mobile:bg-white rounded p-1 mobile:m-2 fixed mobile:relative bg-gray-100'>
      <div className='flex flex-wrap justify-center mobile:justify-start mobile:flex-col mobile:h-full mobile:mt-4 mobile:m-10 mobile:text-2xl mobile:gap-4 mobile:flex-wrap'>
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
