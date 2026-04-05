import { Line } from 'react-chartjs-2';
import { chartColors } from '../../utils/chartHelpers';

/**
 * Props:
 *   labels – string[]
 *   data   – number[]
 *   height – number (px), default 200
 *   color  – stroke hex, default gold
 */
export default function TrendLineChart({ labels, data, height = 200, color = '#c9a84c' }) {
  const c = chartColors();

  const chartData = {
    labels,
    datasets: [{
      label: 'Value',
      data,
      borderColor: color,
      backgroundColor: color + '18',
      fill: true,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 4,
      pointBackgroundColor: color,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: ctx => '$' + ctx.raw.toLocaleString() },
      },
    },
    scales: {
      x: { grid: { color: c.grid }, ticks: { color: c.tick, font: { size: 10 } } },
      y: {
        grid: { color: c.grid },
        ticks: { color: c.tick, font: { size: 10 }, callback: v => '$' + v },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
