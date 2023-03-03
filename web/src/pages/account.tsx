import InfoAccount from '../components/InfoAccount';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';
import Head from 'next/head';
import BalanceComponent from '../components/BalanceComponent';
import Second from '../components/Second';

export default function Account() {
  return (
    <>
      <Head>
        <title>Conta | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='desktop:mx-4 w-full items-start desktop:flex pb-36 desktop:pb-0'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <div className='flex justify-center flex-col desktop:flex-row'>
                <BalanceComponent />
                <Second />
              </div>
              <TransactionTable />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

{
  /* <div>
  <InfoAccount />
  <div className='flex max-w-screen-xl mx-auto overflow-x-auto'>
    <LeftNavBar />
    <div className='flex flex-wrap w-screen'>
      <Balance />
      <Second />
      <TransactionTable />
    </div>
  </div>
</div>; */
}
