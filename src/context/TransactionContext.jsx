import { createContext, useContext } from 'react';
import { useLocalStorage }           from '../hooks/useLocalStorage';
import { SEED_TRANSACTIONS }          from '../data/seedTransactions';

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('v_tx', SEED_TRANSACTIONS);

  const addTransaction = (tx) =>
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev]);

  const editTransaction = (tx) =>
    setTransactions(prev => prev.map(t => t.id === tx.id ? tx : t));

  const deleteTransaction = (id) =>
    setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <TransactionContext.Provider value={{
      transactions, addTransaction, editTransaction, deleteTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactionContext must be inside TransactionProvider');
  return ctx;
};
