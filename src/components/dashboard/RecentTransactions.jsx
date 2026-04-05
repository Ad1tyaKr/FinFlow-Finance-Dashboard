import { useMemo } from 'react';
import { useTransactionContext } from '../../context/TransactionContext';
import { fmt, fmtDate, ICONS, CAT_COLORS } from '../../utils/formatters';

export default function RecentTransactions() {
  const { transactions } = useTransactionContext();

  const recent = useMemo(() =>
    [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [transactions]
  );

  if (!recent.length) {
    return (
      <div className="empty">
        <div className="ei">📭</div>
        No transactions yet.
      </div>
    );
  }

  return (
    <>
      {recent.map((t, i) => (
        <div key={t.id} className="txr" style={{ animationDelay: `${i * 0.05}s` }}>
          <div
            className="tx-ico"
            style={{ background: (CAT_COLORS[t.category] || '#94a3b8') + '22' }}
          >
            {ICONS[t.category] || '💳'}
          </div>
          <div className="tx-d">
            <div className="tx-n">{t.description}</div>
            <div className="tx-dt">{fmtDate(t.date)}</div>
          </div>
          <div className={`tx-v ${t.type === 'income' ? 'up' : 'dn'}`}>
            {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
          </div>
        </div>
      ))}
    </>
  );
}
