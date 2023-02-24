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
        <div className='flex max-w-screen-xl mx-auto overflow-x-auto'>
          <LeftNavBar />
          <div>
            <TransactionTable />
          </div>
        </div>
      </div>
    </>
  );
}
