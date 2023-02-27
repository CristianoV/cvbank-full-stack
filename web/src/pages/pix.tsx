import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import PixComponent from '../components/PixComponent';
import PixKeyComponent from '../components/PixKeyComponent';
import CreatePixKeyComponent from '../components/CreatePixKeyComponent';
import Balance from '../components/Balance';

export default function Pix() {
  return (
    <>
      <Head>
        <title>Pix | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='flex mx-4 w-full items-start'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <div className='flex'>
              <Balance />
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
