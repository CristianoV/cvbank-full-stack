import Head from 'next/head';
import InfoAccount from '../components/InfoAccount';
import LeftNavBar from '../components/LeftNavBar';
import GenerateComponent from '../components/GenerateComponent';
import AllBoletosComponent from '../components/AllBoletosComponent';

export default function Generate() {
  return (
    <>
      <Head>
        <title>Banco NG</title>
      </Head>
      <main>
        <InfoAccount />
        <div className='flex max-w-screen-xl m-auto'>
          <div className='mobile:mx-4 w-full items-start mobile:flex pb-36 mobile:pb-0'>
            <LeftNavBar />
            <div className='w-full justify-center flex flex-col'>
              <GenerateComponent />
              <AllBoletosComponent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
