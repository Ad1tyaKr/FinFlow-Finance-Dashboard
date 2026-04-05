import { useMemo } from 'react';
import { useTransactionContext } from '../../context/TransactionContext';
import { useToast } from '../../context/ToastContext';
import Button from '../ui/Button';
import { fmt } from '../../utils/formatters';

export default function HeroBalance() {
  const { transactions } = useTransactionContext();
  const { addToast }     = useToast();

  const { income, expenses } = useMemo(() => ({
    income:   transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0),
    expenses: transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0),
  }), [transactions]);

  return (
    <div className="hero">
      <div className="h-lbl">Total Net Worth</div>
      <div className="h-amt">$31,180<span>.24</span></div>
      <div style={{ marginBottom: 13 }}>
        <span className="h-pill">▲ +3.4% this month</span>
      </div>

      <div className="h-acts">
        <Button variant="gold"  onClick={() => addToast('Transfer initiated', '💸', '#c9a84c')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send
        </Button>
        <Button variant="ghost" onClick={() => addToast('Receive flow opened', '📥', '#2dd4a0')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Receive
        </Button>
        <Button variant="ghost" onClick={() => addToast('Exchange opened', '🔄', '#4d9ef7')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          Exchange
        </Button>
      </div>

      <div className="h-stats">
        <div className="hs"><div className="hsl">Monthly Income</div><div className="hsv up">+{fmt(income)}</div></div>
        <div className="hs"><div className="hsl">Monthly Spend</div><div className="hsv dn">-{fmt(expenses)}</div></div>
        <div className="hs"><div className="hsl">Investments</div><div className="hsv up">+$12,340</div></div>
        <div className="hs"><div className="hsl">Savings</div><div className="hsv up">$8,650</div></div>
      </div>
    </div>
  );
}
