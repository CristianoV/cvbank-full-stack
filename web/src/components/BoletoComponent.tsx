interface Props {
  boletoId: string;
  value: number;
  status: string;
  createdAt: string;
}

export default function BoletoComponent({
  boletoId,
  createdAt,
  status,
  value,
}: Props) {
  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <>
      <div className='w-full justify-center flex flex-col'>
        <div className='bg-white rounded p-5 m-2'>
          <h1 className='text-center text-success mb-3 font-bold'>
            Boleto Criado com sucesso
          </h1>
          <p className=''>
            Codigo de barra: <span className='ml-1'>{boletoId}</span>
          </p>
          <p className=''>
            Valor a ser pago:
            <span className='ml-1'>{priceFormat.format(value / 100)}</span>
          </p>
          <p className=''>
            Estado do boleto:
            <span className='ml-1'>{status}</span>
          </p>
          <p className=''>
            Data:
            <span className='ml-1'>
              {new Date(createdAt).toLocaleDateString('pt-BR')}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
