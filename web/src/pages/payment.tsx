import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import PaymentComponent from '../components/PaymentComponent';
import Balance from '../components/Balance';

export default function Payment() {
  return (
    <>
      <Head>
        <title>Pagamento | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='desktop:mx-4 w-full items-start desktop:flex pb-36 desktop:pb-0'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <div className='flex'>
                <Balance />
              </div>
              <PaymentComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
