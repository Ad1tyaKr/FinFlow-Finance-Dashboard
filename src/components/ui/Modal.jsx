import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/formatters';
import Button from './Button';

/**
 * Add / Edit transaction modal.
 * Props:
 *   title    – heading string
 *   existing – transaction object (edit mode) or null (add mode)
 *   onClose  – called when cancelled
 *   onSave   – called with the final transaction object
 */
export default function Modal({ title, existing, onClose, onSave }) {
  const today = new Date().toISOString().slice(0, 10);

  const [date,  setDate]  = useState(existing?.date  ?? today);
  const [desc,  setDesc]  = useState(existing?.description ?? '');
  const [amt,   setAmt]   = useState(existing ? Math.abs(existing.amount) : '');
  const [cat,   setCat]   = useState(existing?.category ?? 'Food');
  const [type,  setType]  = useState(existing?.type  ?? 'expense');
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSave = () => {
    if (!date || !desc.trim() || !amt || isNaN(Number(amt)) || Number(amt) <= 0) {
      setError('Please fill all fields with valid values.');
      return;
    }
    const finalAmt = type === 'expense' ? -Math.abs(Number(amt)) : Math.abs(Number(amt));
    onSave({
      id:          existing?.id ?? Date.now(),
      date,
      description: desc.trim(),
      amount:      finalAmt,
      category:    cat,
      type,
    });
  };

  return (
    <div className="mbg open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="mtitle">{title}</div>

        {error && (
          <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 10 }}>{error}</div>
        )}

        <div className="fr">
          <label className="fl">Date</label>
          <input type="date" className="fi" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="fr">
          <label className="fl">Description</label>
          <input
            type="text" className="fi" placeholder="e.g. Monthly Salary"
            value={desc} onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div className="fr">
          <label className="fl">Amount ($)</label>
          <input
            type="number" className="fi" placeholder="0.00" min="0" step="0.01"
            value={amt} onChange={e => setAmt(e.target.value)}
          />
        </div>

        <div className="fr">
          <label className="fl">Category</label>
          <select className="fi" value={cat} onChange={e => setCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="fr">
          <label className="fl">Type</label>
          <div className="ttog">
            <button
              className={`tb ${type === 'income' ? 'ai' : ''}`}
              onClick={() => setType('income')}
            >↑ Income</button>
            <button
              className={`tb ${type === 'expense' ? 'ae' : ''}`}
              onClick={() => setType('expense')}
            >↓ Expense</button>
          </div>
        </div>

        <div className="mf">
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="gold"  onClick={handleSave} style={{ flex: 2 }}>Save Transaction</Button>
        </div>
      </div>
    </div>
  );
}
