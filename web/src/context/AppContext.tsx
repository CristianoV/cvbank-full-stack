import { createContext, useContext, useState } from 'react';
import { IAppContextProps } from '../interfaces/IProps/IAppContextProps';

const AppContext = createContext([{}, () => {}]);

export function AppWrapper({ children }: IAppContextProps) {
  const [state, setState] = useState({
    token: '',
    username: '',
    balance: 0,
    pixKey: '',
    transactions: [],
    newTransaction: true,
    newBalance: true,
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
