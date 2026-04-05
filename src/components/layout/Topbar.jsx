import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation }    from 'react-router-dom';
import { useTheme }   from '../../context/ThemeContext';
import { useExport }  from '../../hooks/useExport';
import { useToast }   from '../../context/ToastContext';
import { useState as useModalState } from 'react';
import Modal from '../ui/Modal';
import { useTransactionContext } from '../../context/TransactionContext';

const PAGE_TITLES = {
  '/dashboard':    'Dashboard',
  '/transactions': 'Transactions',
  '/cards':        'My Cards',
  '/analytics':    'Analytics',
  '/goals':        'Goals',
  '/learn':        'Learn',
  '/security':     'Security',
};

export default function Topbar({ onHamburger }) {
  const { theme, toggleTheme }       = useTheme();
  const { handleCSV, handleJSON, handleSummary } = useExport();
  const { addToast }                 = useToast();
  const { addTransaction }           = useTransactionContext();
  const navigate                     = useNavigate();
  const location                     = useLocation();

  const [exportOpen, setExportOpen]  = useState(false);
  const [modalOpen,  setModalOpen]   = useState(false);
  const [query,      setQuery]       = useState('');
  const exportRef                    = useRef(null);

  const title = PAGE_TITLES[location.pathname] || 'Vault';

  // Close export menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/transactions?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const handleSaveTransaction = (tx) => {
    addTransaction(tx);
    addToast('Transaction added ✓', '✓', '#2dd4a0');
    setModalOpen(false);
  };

  return (
    <>
      <header className="topbar">
        {/* Hamburger (mobile) */}
        <button className="ham" onClick={onHamburger}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className="tb-title">{title}</div>
        <div className="tb-space" />

        {/* Search */}
        <div className="tb-srch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            placeholder="Search transactions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Add transaction */}
        <div className="ib" onClick={() => setModalOpen(true)} title="Add transaction">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
        </div>

        {/* Notification */}
        <div className="ib" onClick={() => addToast('No new notifications', '🔔', '#c9a84c')} title="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <div className="ndot" />
        </div>

        {/* Export */}
        <div style={{ position: 'relative' }} ref={exportRef}>
          <div className="ib" onClick={() => setExportOpen(o => !o)} title="Export data">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          {exportOpen && (
            <div className="export-menu">
              <button onClick={() => { handleCSV();     setExportOpen(false); }}>📊 Export CSV</button>
              <button onClick={() => { handleJSON();    setExportOpen(false); }}>🗂️ Export JSON</button>
              <button onClick={() => { handleSummary(); setExportOpen(false); }}>📋 Summary Report</button>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <div className="ib" onClick={toggleTheme} title="Toggle dark/light mode">
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1"  x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1"  y1="12" x2="3"  y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78"  x2="5.64"  y2="18.36"/>
              <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z"/>
            </svg>
          )}
        </div>
      </header>

      {/* Quick-add modal */}
      {modalOpen && (
        <Modal
          title="Add Transaction"
          existing={null}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveTransaction}
        />
      )}
    </>
  );
}
