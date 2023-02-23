import InfoAccount from '../components/InfoAccount';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';
import Head from 'next/head';

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
          <div className='mx-auto'>
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}
