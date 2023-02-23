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
      <div>
        <InfoAccount />
        <div className='flex'>
          <LeftNavBar />
          <div className='flex w-3/4 flex-wrap justify-center'>
            <Balance />
            <Second />
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}
