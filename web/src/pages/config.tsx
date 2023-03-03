import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import ConfigComponent from '../components/ConfigComponent';

export default function Config() {
  return (
    <>
      <Head>
        <title>Configurações | Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='flex mx-4 w-full items-start'>
            <ConfigComponent />
          </div>
        </div>
      </main>
    </>
  );
}
