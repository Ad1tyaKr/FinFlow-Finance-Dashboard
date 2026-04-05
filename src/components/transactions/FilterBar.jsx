import Button from '../ui/Button';

/**
 * Props:
 *   filters     – { query, setQuery, type, setType, category, setCat, month, setMonth }
 *   categories  – string[] e.g. ['all','Food','Housing',…]
 *   months      – string[] e.g. ['all','2025-03','2025-02',…]
 *   onClear     – callback to reset all filters
 */
export default function FilterBar({ filters, categories, months, onClear }) {
  const { query, setQuery, type, setType, category, setCat, month, setMonth } = filters;

  return (
    <div className="fbar">
      {/* Search */}
      <div className="sw">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="sinp"
          placeholder="Search description, category…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Type */}
      <select className="fsel" value={type} onChange={e => setType(e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <select className="fsel" value={category} onChange={e => setCat(e.target.value)}>
        {categories.map(c => (
          <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
        ))}
      </select>

      {/* Month */}
      <select className="fsel" value={month} onChange={e => setMonth(e.target.value)}>
        {months.map(m => (
          <option key={m} value={m}>{m === 'all' ? 'All Months' : m}</option>
        ))}
      </select>

      <Button variant="ghost" size="sm" onClick={onClear}>Clear</Button>
    </div>
  );
}
