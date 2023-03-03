import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import PixComponent from '../components/PixComponent';
import PixKeyComponent from '../components/PixKeyComponent';
import CreatePixKeyComponent from '../components/CreatePixKeyComponent';
import Balance from '../components/Balance';
import { useAppContext } from '../context/AppContext';

export default function Pix() {
  const [state, setState] = useAppContext() as any;
  return (
    <>
      <Head>
        <title>Pix | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='desktop:mx-4 w-full items-start desktop:flex pb-36 desktop:pb-0'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <div className='desktop:flex'>
                {state.pixKey && <Balance />}
                <PixKeyComponent />
                <CreatePixKeyComponent />
              </div>
              <PixComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
