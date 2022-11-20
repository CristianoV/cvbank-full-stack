import { createContext, useContext, useState } from 'react';

const AppContext = createContext([{}, () => {}]);

export function AppWrapper({ children }) {
  const [state, setState] = useState({
    token: '',
    username: '',
    balance: 0,
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