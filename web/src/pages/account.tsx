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
        <div className='flex max-w-screen-xl mx-auto overflow-x-auto'>
          <LeftNavBar />
          <div className='flex flex-wrap w-screen'>
            <Balance />
            <Second />
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}
