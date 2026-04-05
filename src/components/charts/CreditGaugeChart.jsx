import { Doughnut } from 'react-chartjs-2';
import { chartColors } from '../../utils/chartHelpers';

/** Semi-circle gauge showing credit score 300–850 */
export default function CreditGaugeChart({ score = 745 }) {
  const c = chartColors();
  const filled = score - 300;
  const empty  = 850 - score;

  const data = {
    datasets: [{
      data: [filled, empty, 150],
      backgroundColor: [
        '#c9a84c',
        c.grid,
        'transparent',
      ],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
    }],
  };

  const options = {
    responsive: false,
    plugins: {
      legend:  { display: false },
      tooltip: { enabled: false },
    },
    cutout: '72%',
  };

  return (
    <div className="gb">
      <canvas style={{ display: 'none' }} />
      <Doughnut data={data} options={options} width={185} height={110} />
      <div className="gc">
        <div className="g-n">{score}</div>
        <div className="g-l">Excellent</div>
      </div>
    </div>
  );
}
