import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  ArcElement, Tooltip, Legend, Filler
);

/** Returns tick/grid colours that adapt to current theme */
export const chartColors = () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    tick:  dark ? '#5a5f80' : '#9a937a',
    grid:  dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)',
    tooltip: {
      backgroundColor: dark ? '#1a2030' : '#fff',
      bodyColor:        dark ? '#8a8fa8' : '#6b6558',
      borderColor: 'rgba(201,168,76,.2)',
      borderWidth: 1,
    },
  };
};
