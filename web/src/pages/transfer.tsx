import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';
import Balance from '../components/Balance';

export default function Account() {
  return (
    <>
      <Head>
        <title>Transferencia | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='mobile:mx-4 w-full items-start mobile:flex pb-36 mobile:pb-0'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <div className='flex'>
                <Balance />
              </div>
              <NewTransaction />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
