import { Bar } from 'react-chartjs-2';
import { chartColors } from '../../utils/chartHelpers';

const SPEND_DATA = {
  W: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], data: [320,180,540,290,680,820,440] },
  M: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data: [1900,2100,1700,2400,2200,1800,2600,2900,2400,3100,2700,2145] },
  Y: { labels: ['2020','2021','2022','2023','2024'], data: [18000,22000,19500,24000,28500] },
};

/**
 * Props:
 *   period – 'W' | 'M' | 'Y'  (controlled from parent)
 *   data   – optional override array (used on MyCards page per-card)
 *   labels – optional override labels
 */
export default function SpendBarChart({ period = 'M', data, labels }) {
  const c   = chartColors();
  const src = data ? { labels, data } : SPEND_DATA[period];

  const chartData = {
    labels: src.labels,
    datasets: [{
      data: src.data,
      backgroundColor: src.data.map((_, i) =>
        i === src.data.length - 1 ? '#c9a84c' : 'rgba(201,168,76,.2)'
      ),
      borderRadius: 5,
      borderSkipped: false,
      hoverBackgroundColor: 'rgba(201,168,76,.6)',
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: (ctx) => '$' + ctx.raw.toLocaleString() },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: c.tick, font: { size: 10 } } },
      y: {
        grid: { color: c.grid },
        ticks: { color: c.tick, font: { size: 10 }, callback: v => '$' + (v / 1000).toFixed(0) + 'k' },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: 175 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
