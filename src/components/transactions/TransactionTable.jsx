import TransactionRow from './TransactionRow';

const COLUMNS = [
  { key: 'date',        label: 'Date'        },
  { key: 'description', label: 'Description' },
  { key: 'category',    label: 'Category'    },
  { key: 'type',        label: 'Type'        },
  { key: 'amount',      label: 'Amount'      },
];

/**
 * Props:
 *   transactions – paginated slice to render
 *   sortKey      – currently active sort column key
 *   sortDir      – 'asc' | 'desc'
 *   onSort       – (key) => void
 *   onEdit       – (tx)  => void
 *   onDelete     – (id)  => void
 */
export default function TransactionTable({
  transactions,
  sortKey,
  sortDir,
  onSort,
  onEdit,
  onDelete,
}) {
  const arrow = (key) => {
    if (sortKey !== key) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="tbl-wrap">
      <table className="ftbl">
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th key={col.key} onClick={() => onSort(col.key)}>
                {col.label} <span>{arrow(col.key)}</span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="empty">
                  <div className="ei">📭</div>
                  No transactions match your filters.
                </div>
              </td>
            </tr>
          ) : (
            transactions.map(tx => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
