import InfoAcount from '../components/InfoAcount';
import TransactionTable from '../components/TransactionTable';
import LeftNavBar from '../components/LeftNavBar';

export default function Account() {
  return (
    <div>
      <InfoAcount />
      <div className='flex'>
        <LeftNavBar />
        <div className='mx-auto'>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}
