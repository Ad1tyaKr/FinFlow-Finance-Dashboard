/**
 * Props:
 *   page         – current page (1-indexed)
 *   total        – total number of pages
 *   count        – total number of filtered results
 *   onPageChange – (n) => void
 */
export default function Pagination({ page, total, count, onPageChange }) {
  if (total <= 1) return null;

  return (
    <div className="pgr">
      <span className="pg-inf">{count} results</span>

      {/* Prev arrow */}
      <button
        className="pg-b"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={{ opacity: page === 1 ? 0.4 : 1 }}
      >‹</button>

      {/* Page numbers with ellipsis */}
      {Array.from({ length: total }, (_, i) => i + 1)
        .filter(n => n === 1 || n === total || Math.abs(n - page) <= 1)
        .reduce((acc, n, idx, arr) => {
          if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
          acc.push(n);
          return acc;
        }, [])
        .map((item, idx) =>
          item === '…' ? (
            <span key={`ellipsis-${idx}`} style={{ color: 'var(--txt3)', padding: '0 4px', fontSize: 12 }}>…</span>
          ) : (
            <button
              key={item}
              className={`pg-b${item === page ? ' on' : ''}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          )
        )
      }

      {/* Next arrow */}
      <button
        className="pg-b"
        onClick={() => onPageChange(page + 1)}
        disabled={page === total}
        style={{ opacity: page === total ? 0.4 : 1 }}
      >›</button>
    </div>
  );
}
