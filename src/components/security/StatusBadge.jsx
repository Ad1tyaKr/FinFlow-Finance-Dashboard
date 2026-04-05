/**
 * Props:
 *   label – descriptive string e.g. "Password Strength"
 *   value – value string e.g. "Strong"
 *   cls   – CSS class: 's-ok' | 's-warn' | 's-bad'
 */
export default function StatusBadge({ label, value, cls }) {
  return (
    <div className="s-item" style={{ justifyContent: 'space-between' }}>
      <div className="s-nm">{label}</div>
      <span className={`s-badge ${cls}`}>{value}</span>
    </div>
  );
}
