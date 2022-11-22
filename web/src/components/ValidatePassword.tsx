import { IValidatePasswordProps } from '../interfaces/IProps/IValidatePasswordProps';

export default function ValidatePassword({ password }: IValidatePasswordProps) {
  return (
    <div className='text-xs flex gap-2'>
      <h1 className={password.length > 8 ? 'text-green-700' : 'text-black'}>
        8 caracteres
      </h1>
      <h1 className={password.match(/[A-Z]/) ? 'text-green-700' : 'text-black'}>
        1 letra maiúscula
      </h1>
      <h1 className={password.match(/[a-z]/) ? 'text-green-700' : 'text-black'}>
        1 letra minúscula
      </h1>
      <h1 className={password.match(/[0-9]/) ? 'text-green-700' : 'text-black'}>
        1 número
      </h1>
    </div>
  );
}
