import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';

export default function Pix() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <div>
        <InfoAccount />
        <div className='flex max-w-screen-xl mx-auto'>
          <LeftNavBar />
          <div className='mx-auto'></div>
        </div>
      </div>
    </>
  );
}
