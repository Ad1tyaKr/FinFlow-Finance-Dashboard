import { useState, useEffect }         from 'react';
import { useSearchParams }             from 'react-router-dom';
import { useTransactionContext }       from '../context/TransactionContext';
import { useFilteredTransactions }     from '../hooks/useTransactions';
import { useExport }                   from '../hooks/useExport';
import { useToast }                    from '../context/ToastContext';
import FilterBar       from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import Pagination      from '../components/transactions/Pagination';
import Modal           from '../components/ui/Modal';
import Button          from '../components/ui/Button';

export default function Transactions() {
  const { addTransaction, editTransaction, deleteTransaction } = useTransactionContext();
  const { addToast } = useToast();
  const { handleCSV, handleJSON } = useExport();
  const [searchParams] = useSearchParams();

  const {
    filtered, paginated, totalPages, page, setPage,
    sort, sortKey, sortDir, clearFilters,
    categories, months, filters,
  } = useFilteredTransactions();

  // Sync ?q= URL param into search filter
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) filters.setQuery(q);
  }, [searchParams]); // eslint-disable-line

  const [modal, setModal] = useState(null); // null | 'add' | txObject

  const handleSave = (tx) => {
    if (modal === 'add') {
      addTransaction(tx);
      addToast('Transaction added ✓', '✓', '#2dd4a0');
    } else {
      editTransaction(tx);
      addToast('Transaction updated ✓', '✓', '#2dd4a0');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    deleteTransaction(id);
    addToast('Transaction deleted', '🗑️', '#f4637a');
  };

  return (
    <div className="page">
      <div className="card">
        {/* Header */}
        <div className="ch">
          <div className="ct">All Transactions</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button variant="ghost" size="sm" onClick={handleCSV}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleJSON}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              JSON
            </Button>
            <Button variant="gold" size="sm" onClick={() => setModal('add')}>
              + Add Transaction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          categories={categories}
          months={months}
          onClear={clearFilters}
        />

        {/* Table */}
        <TransactionTable
          transactions={paginated}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={sort}
          onEdit={(tx) => setModal(tx)}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          total={totalPages}
          count={filtered.length}
          onPageChange={setPage}
        />
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          title={modal === 'add' ? 'Add Transaction' : 'Edit Transaction'}
          existing={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
