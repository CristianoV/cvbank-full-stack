import InfoAcount from '../components/InfoAcount';
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
        <InfoAcount />
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
