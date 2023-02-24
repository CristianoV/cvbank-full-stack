import InfoAccount from '../components/InfoAccount';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';
import Head from 'next/head';
import Balance from '../components/Balance';
import Second from '../components/Second';

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
            <div className='flex justify-center'>
              <Balance />
              <Second />
            </div>
            <TransactionTable />
          </div>
        </div>
      </main>
    </>
  );
}
