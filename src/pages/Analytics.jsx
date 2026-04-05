import { useMemo }                 from 'react';
import { useTransactionContext }   from '../context/TransactionContext';
import TrendLineChart              from '../components/charts/TrendLineChart';
import PieBreakdownChart           from '../components/charts/PieBreakdownChart';
import IncomeExpenseBarChart       from '../components/charts/IncomeExpenseBarChart';
import { fmt }                     from '../utils/formatters';

const CREDIT_HISTORY = {
  labels: ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  data:   [690,700,705,710,720,728,732,738,745],
};

export default function Analytics() {
  const { transactions } = useTransactionContext();

  const { income, expenses, savings, savingsRate, monthlyLabels, monthlyNet } = useMemo(() => {
    const inc = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
    const exp = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
    const sav = inc - exp;
    const sr  = inc > 0 ? ((sav / inc) * 100).toFixed(1) : 0;

    const mo = {};
    transactions.forEach(t => {
      const k = t.date.slice(0, 7);
      if (!mo[k]) mo[k] = { income: 0, expenses: 0 };
      if (t.type === 'income') mo[k].income   += Math.abs(t.amount);
      else                     mo[k].expenses += Math.abs(t.amount);
    });
    const keys = Object.keys(mo).sort();

    return {
      income: inc, expenses: exp, savings: sav, savingsRate: sr,
      monthlyLabels: keys,
      monthlyNet:    keys.map(k => mo[k].income - mo[k].expenses),
    };
  }, [transactions]);

  const STAT_CARDS = [
    { label: 'Total Income',   value: fmt(income),   sub: 'All time',  color: 'var(--green)' },
    { label: 'Total Expenses', value: fmt(expenses), sub: 'All time',  color: 'var(--red)'   },
    { label: 'Net Savings',    value: fmt(savings),  sub: 'All time',  color: 'var(--gold)'  },
    { label: 'Savings Rate',   value: savingsRate + '%', sub: 'Of income', color: 'var(--blue)' },
  ];

  return (
    <div className="page">
      {/* KPI cards */}
      <div className="stats4">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="sbox">
            <div className="sbl">{s.label}</div>
            <div className="sbv" style={{ color: s.color }}>{s.value}</div>
            <div className="sbs">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two charts side by side */}
      <div className="an2">
        <div className="card">
          <div className="ch"><div className="ct">Monthly Net Balance</div></div>
          <TrendLineChart labels={monthlyLabels} data={monthlyNet} height={195} />
        </div>
        <div className="card">
          <div className="ch"><div className="ct">Spending by Category</div></div>
          <PieBreakdownChart transactions={transactions} height={195} />
        </div>
      </div>

      {/* Income vs Expenses full-width */}
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="ch"><div className="ct">Income vs Expenses</div></div>
        <IncomeExpenseBarChart transactions={transactions} height={195} />
      </div>

      {/* Credit score history */}
      <div className="card">
        <div className="ch"><div className="ct">Credit Score History</div></div>
        <TrendLineChart
          labels={CREDIT_HISTORY.labels}
          data={CREDIT_HISTORY.data}
          height={175}
          color="#c9a84c"
        />
      </div>
    </div>
  );
}
