import Head from 'next/head';
import InfoAcount from '../components/InfoAcount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';

export default function Generate() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <div>
        <InfoAcount />
        <div className='flex'>
          <LeftNavBar />
          <div className='mx-auto'></div>
        </div>
      </div>
    </>
  );
}
