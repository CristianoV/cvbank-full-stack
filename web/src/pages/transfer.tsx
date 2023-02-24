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
        <div className='flex max-w-screen-xl mx-4 m-auto items-start'>
          <LeftNavBar />
          <div className='w-full justify-center flex flex-col'>
            <NewTransaction />
          </div>
        </div>
      </main>
    </>
  );
}
