import Head from 'next/head';
import InfoAcount from '../components/InfoAcount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';

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
            <NewTransaction />
          </div>
        </div>
      </div>
    </>
  );
}
