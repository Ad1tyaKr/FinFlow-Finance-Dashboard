import Badge  from '../ui/Badge';
import Button from '../ui/Button';
import { fmt, fmtDate, ICONS, CAT_COLORS } from '../../utils/formatters';

/**
 * Props:
 *   tx       – transaction object
 *   onEdit   – (tx) => void
 *   onDelete – (id) => void
 */
export default function TransactionRow({ tx, onEdit, onDelete }) {
  const catColor = CAT_COLORS[tx.category] || '#94a3b8';

  return (
    <tr>
      <td style={{ color: 'var(--txt3)', fontFamily: "'DM Mono', monospace", fontSize: 11.5, whiteSpace: 'nowrap' }}>
        {fmtDate(tx.date)}
      </td>

      <td style={{ fontWeight: 600, color: 'var(--txt)' }}>
        <span style={{ marginRight: 6 }}>{ICONS[tx.category] || '💳'}</span>
        {tx.description}
      </td>

      <td>
        <Badge variant="custom" color={catColor} bg={catColor + '22'}>
          {tx.category}
        </Badge>
      </td>

      <td>
        <Badge variant={tx.type === 'income' ? 'income' : 'expense'}>
          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
        </Badge>
      </td>

      <td style={{
        fontFamily: "'DM Mono', monospace", fontWeight: 500,
        color: tx.type === 'income' ? 'var(--green)' : 'var(--red)',
      }}>
        {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
      </td>

      <td style={{ whiteSpace: 'nowrap' }}>
        <Button variant="ghost" size="sm" onClick={() => onEdit(tx)} style={{ marginRight: 4 }}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(tx.id)}>
          Del
        </Button>
      </td>
    </tr>
  );
}
