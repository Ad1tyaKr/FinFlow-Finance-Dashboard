import { useState, useMemo } from 'react';
import { useTransactionContext } from '../context/TransactionContext';

const PER_PAGE = 10;

/**
 * Encapsulates all filter, sort, search, and pagination logic
 * for the Transactions page. Keeps pages clean.
 */
export function useFilteredTransactions() {
  const { transactions } = useTransactionContext();

  const [query,   setQuery]   = useState('');
  const [type,    setType]    = useState('all');
  const [category,setCat]     = useState('all');
  const [month,   setMonth]   = useState('all');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page,    setPage]    = useState(1);

  const filtered = useMemo(() => {
    let list = [...transactions];

    if (query)
      list = list.filter(t =>
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      );
    if (type !== 'all')     list = list.filter(t => t.type === type);
    if (category !== 'all') list = list.filter(t => t.category === category);
    if (month !== 'all')    list = list.filter(t => t.date.startsWith(month));

    list.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (sortKey === 'amount') { va = Math.abs(a.amount); vb = Math.abs(b.amount); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });

    return list;
  }, [transactions, query, type, category, month, sortKey, sortDir]);

  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages  = Math.ceil(filtered.length / PER_PAGE);

  /** Toggle sort direction or set a new sort key */
  const sort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(1);
  };

  const clearFilters = () => {
    setQuery(''); setType('all'); setCat('all'); setMonth('all'); setPage(1);
  };

  /** Unique categories & months derived from transactions */
  const categories = useMemo(() =>
    ['all', ...new Set(transactions.map(t => t.category))].sort(),
    [transactions]
  );
  const months = useMemo(() =>
    ['all', ...new Set(transactions.map(t => t.date.slice(0, 7)))].sort().reverse(),
    [transactions]
  );

  return {
    filtered, paginated, totalPages, page, setPage,
    sort, sortKey, sortDir, clearFilters,
    categories, months,
    filters: { query, setQuery, type, setType, category, setCat, month, setMonth },
  };
}
