import React, { InputHTMLAttributes, useCallback } from 'react';

import { currency } from '../lib/masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'currency';
  prefix?: string;
}

const Input: React.FC<InputProps> = ({ mask, prefix, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'currency') {
        currency(e);
      }
    },
    [mask]
  );

  return (
    <div>
      {prefix && <span className='prefix-span'>{prefix}</span>}
      <label htmlFor='' className='flex flex-col'>
        Valor
        <input
          className='border border-[#001813] rounded-md p-1 w-80 h-11 shadow-md'
          {...props}
          onKeyUp={handleKeyUp}
        />
      </label>
    </div>
  );
};

export default Input;
