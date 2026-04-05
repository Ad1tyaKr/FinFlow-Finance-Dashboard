import { useTransactionContext } from '../context/TransactionContext';
import { useToast }              from '../context/ToastContext';
import { exportCSV, exportJSON, exportSummary } from '../utils/exportHelpers';

/**
 * Wires export utilities to the current transaction list + toast feedback.
 */
export function useExport() {
  const { transactions } = useTransactionContext();
  const { addToast }     = useToast();

  const handleCSV = () => {
    exportCSV(transactions);
    addToast('CSV exported ✓', '📊', '#2dd4a0');
  };

  const handleJSON = () => {
    exportJSON(transactions);
    addToast('JSON exported ✓', '🗂️', '#2dd4a0');
  };

  const handleSummary = () => {
    exportSummary(transactions);
    addToast('Summary report exported ✓', '📋', '#c9a84c');
  };

  return { handleCSV, handleJSON, handleSummary };
}
