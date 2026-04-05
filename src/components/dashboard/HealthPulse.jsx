import { useMemo } from 'react';
import { useTransactionContext } from '../../context/TransactionContext';

const PULSE_ITEMS = (savingsRate, spendPct) => [
  { label: 'Savings',    pct: savingsRate, color: '#2dd4a0' },
  { label: 'Debt Ratio', pct: 18,          color: '#4d9ef7' },
  { label: 'Spending',   pct: spendPct,    color: '#f5a623' },
  { label: 'Inv. Growth',pct: 91,          color: '#c9a84c' },
];

function PulseRing({ pct, color, label }) {
  const r    = 23;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);

  return (
    <div className="pi">
      <div className="pr">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r={r} fill="none" stroke="var(--sur3)" strokeWidth="4" />
          <circle
            cx="25" cy="25" r={r} fill="none"
            stroke={color} strokeWidth="4"
            strokeDasharray={`${dash.toFixed(1)} ${(circ - dash).toFixed(1)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="pr-v" style={{ color, fontSize: 12 }}>{pct}%</div>
      </div>
      <div className="pl">{label}</div>
    </div>
  );
}

export default function HealthPulse() {
  const { transactions } = useTransactionContext();

  const { savingsRate, spendPct } = useMemo(() => {
    const inc = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
    const exp = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
    return {
      savingsRate: inc > 0 ? Math.round(((inc - exp) / inc) * 100) : 0,
      spendPct:    inc > 0 ? Math.min(100, Math.round((exp / inc) * 100)) : 0,
    };
  }, [transactions]);

  return (
    <div className="pg">
      {PULSE_ITEMS(savingsRate, spendPct).map(p => (
        <PulseRing key={p.label} {...p} />
      ))}
    </div>
  );
}
