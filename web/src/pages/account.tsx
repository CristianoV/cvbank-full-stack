import InfoAccount from '../components/InfoAccount';
import NewTransaction from '../components/NewTransaction';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';
import Head from 'next/head';
import Balance from '../components/Balance';

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
            <Balance />
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}
