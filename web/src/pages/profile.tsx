import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <div>
        <InfoAccount />
        <div className='flex max-w-screen-xl mx-4 m-auto items-start'>
          <LeftNavBar />
          <div className='mx-auto'></div>
        </div>
      </div>
    </>
  );
}
