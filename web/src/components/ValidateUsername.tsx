import { IUsernameProps } from '../interfaces/IProps/IUsernameProps';

export default function ValidateUsername({ username }: IUsernameProps) {
  return (
    <div className='text-xs'>
      <h1 className={username.length > 3 ? 'text-green-700' : 'text-black'}>
        3 caracteres
      </h1>
    </div>
  );
}
