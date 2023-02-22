import InfoAcount from '../components/InfoAcount';
import LeftNavBar from '../components/LeftNavBar';
import NewTransaction from '../components/NewTransaction';

export default function Account() {
  return (
    <div>
      <InfoAcount />
      <div className='flex'>
        <LeftNavBar />
        <div className='mx-auto'>
          <NewTransaction />
        </div>
      </div>
    </div>
  );
}
