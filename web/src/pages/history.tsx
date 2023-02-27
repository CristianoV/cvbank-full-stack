import InfoAccount from '../components/InfoAccount';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';
import Head from 'next/head';

export default function Account() {
  return (
    <>
      <Head>
        <title>Extrato | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='flex mx-4 w-full items-start'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <TransactionTable />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
