import { GiReceiveMoney } from 'react-icons/gi';

export default function Balance() {
  return (
    <div className='bg-white rounded p-3 m-2 desktop:w-6/12 desktop:h-72 flex flex-col justify-between'>
      <h1 className='text-2xl'>Proximas liberações</h1>
      <GiReceiveMoney className='text-5xl text-green-500 self-center' />
      <p className='text-center p-2'>
        Você não possui valores a receber nos próximos 90 dias
      </p>
    </div>
  );
}