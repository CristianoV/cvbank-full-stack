import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';

function TransactionCells({
  createdAt,
  value,
  creditedAccountId,
  debitedAccountId,
  id,
}) {
  const [state, setState] = useAppContext() as any;
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
  // const date = moment(createdAt).format('LL');
  const date = moment(createdAt).format('DD/MM/YYYY');

  return (
    <tr key={id}>
      <td
        className={`text-center ${
          state.username === debitedAccountId.username
            ? 'text-danger'
            : 'text-success'
        }`}
      >
        {`${state.username === debitedAccountId.username ? '-' : '+'} ${priceFormat.format(
          value / 100
          )}`}
      </td>
      <td className='text-center'>{creditedAccountId.username}</td>
      <td className='text-center'>{debitedAccountId.username}</td>
      <td className='text-center'>{date}</td>
    </tr>
  );
}

TransactionCells.propTypes = {
  id: PropTypes.number.isRequired,
  creditedAccountId: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  debitedAccountId: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TransactionCells;
