import InfoAcount from '../components/InfoAcount';
import NewTransaction from '../components/NewTransaction';
import TransactionTable from '../components/TransactionTable';

export default function Account() {
  return (
    <div>
      <InfoAcount />
      <NewTransaction />
      <TransactionTable />
    </div>
  );
}
