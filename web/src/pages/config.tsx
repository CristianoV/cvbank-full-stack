import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import ConfigComponent from '../components/ConfigComponent';

export default function Config() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <div>
        <InfoAccount />
        <div className='flex max-w-screen-xl mx-auto overflow-x-auto'>
          <div>
            <ConfigComponent />
          </div>
        </div>
      </div>
    </>
  );
}
