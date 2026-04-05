import { Bar } from 'react-chartjs-2';
import { chartColors } from '../../utils/chartHelpers';
import { useMemo } from 'react';

/**
 * Props:
 *   transactions – full array; computes monthly income vs expense
 *   height       – number (px), default 200
 */
export default function IncomeExpenseBarChart({ transactions, height = 200 }) {
  const c = chartColors();

  const { labels, incomeData, expenseData } = useMemo(() => {
    const mo = {};
    transactions.forEach(t => {
      const k = t.date.slice(0, 7);
      if (!mo[k]) mo[k] = { income: 0, expenses: 0 };
      if (t.type === 'income') mo[k].income   += Math.abs(t.amount);
      else                     mo[k].expenses += Math.abs(t.amount);
    });
    const keys = Object.keys(mo).sort();
    return {
      labels:      keys,
      incomeData:  keys.map(k => mo[k].income),
      expenseData: keys.map(k => mo[k].expenses),
    };
  }, [transactions]);

  const chartData = {
    labels,
    datasets: [
      { label: 'Income',   data: incomeData,  backgroundColor: '#22c55e', borderRadius: 4 },
      { label: 'Expenses', data: expenseData, backgroundColor: '#f43f5e', borderRadius: 4 },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: c.tick, font: { size: 11 }, boxWidth: 10 } },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: ctx => `${ctx.dataset.label}: $${ctx.raw.toLocaleString()}` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: c.tick, font: { size: 10 } } },
      y: {
        grid: { color: c.grid },
        ticks: { color: c.tick, font: { size: 10 }, callback: v => '$' + v },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
