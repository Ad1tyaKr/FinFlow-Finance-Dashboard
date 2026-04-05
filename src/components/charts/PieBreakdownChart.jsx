import { Doughnut } from 'react-chartjs-2';
import { CAT_COLORS } from '../../utils/formatters';
import { chartColors } from '../../utils/chartHelpers';
import { useMemo } from 'react';

/**
 * Props:
 *   transactions – full array; component computes category totals internally
 *   height       – number (px), default 200
 */
export default function PieBreakdownChart({ transactions, height = 200 }) {
  const c = chartColors();

  const { labels, data, colors } = useMemo(() => {
    const cats = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => { cats[t.category] = (cats[t.category] || 0) + Math.abs(t.amount); });

    const sorted = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return {
      labels: sorted.map(e => e[0]),
      data:   sorted.map(e => e[1]),
      colors: sorted.map(e => CAT_COLORS[e[0]] || '#94a3b8'),
    };
  }, [transactions]);

  const chartData = {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderWidth: 2,
      borderColor: document.documentElement.getAttribute('data-theme') === 'dark'
        ? '#141820' : '#fff',
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: c.tick, font: { size: 10 }, boxWidth: 10, padding: 7 },
      },
      tooltip: {
        ...c.tooltip,
        callbacks: {
          label: ctx => `${ctx.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
