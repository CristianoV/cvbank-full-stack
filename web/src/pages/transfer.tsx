import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';

export default function Account() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='flex mx-4 w-full items-start'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <NewTransaction />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
