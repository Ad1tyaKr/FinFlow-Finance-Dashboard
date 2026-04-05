/**
 * Props:
 *   pct – 0–100 number
 */
export default function GoalProgressBar({ pct }) {
  return (
    <div className="goal-bar">
      <div className="goal-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
