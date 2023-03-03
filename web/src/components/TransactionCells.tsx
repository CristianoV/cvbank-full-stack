import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import moment from 'moment';
import { IContext } from '../interfaces/IData/IContext';
import { ITransaction } from '../interfaces/IData/ITransaction';

function TransactionCells({
  createdAt,
  value,
  creditedUser,
  debitedUser,
  id,
  type,
}: ITransaction) {
  const [state, setState] = useAppContext() as unknown as [
    IContext,
    (state: IContext) => void
  ];
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const date = moment(createdAt).format('DD/MM/YYYY');

  return (
    <tr key={id}>
      <td
        className={`text-center ${
          state.username === debitedUser.username
            ? 'text-danger'
            : 'text-success'
        }`}
      >
        {`${
          state.username === debitedUser.username ? '-' : '+'
        } ${priceFormat.format(value / 100)}`}
      </td>
      <td className='text-center hidden mobile:block'>{type}</td>
      <td className='text-center'>{creditedUser.username}</td>
      <td className='text-center'>{debitedUser.username}</td>
      <td className='text-center hidden mobile:block'>{date}</td>
    </tr>
  );
}
  
TransactionCells.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TransactionCells;
