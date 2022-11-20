
export default function ValidateUsername({ username }) {
  return (
    <div className='text-xs'>
    <h1 className={username.length > 3 ? 'text-green-700' : 'text-black'}>
      3 caracteres
    </h1>
  </div>
  );
};