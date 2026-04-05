import { useCards } from '../../hooks/useCards';

const row = (label, value) => (
  <div key={label} style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '9px 0', borderBottom: '1px solid var(--bdr)',
  }}>
    <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{label}</span>
    <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--txt)', fontFamily: "'DM Mono', monospace" }}>
      {value}
    </span>
  </div>
);

/** Shows key/value details for the currently active card. */
export default function CardDetailsPanel() {
  const { activeCard } = useCards();
  const cd = activeCard;

  const details = [
    ['Card Number', cd.num],
    ['Card Holder', cd.name],
    ['Expiry Date', cd.exp],
    ['Card Type',   cd.type],
    ['Network',     cd.brand],
    ['Credit Limit', cd.limit ? '$' + cd.limit.toLocaleString() : '—'],
    ['Available',    cd.limit ? '$' + (cd.limit - cd.balance).toLocaleString() : '—'],
  ];

  return (
    <div style={{ fontSize: 12 }}>
      {details.map(([label, value]) => row(label, value))}
    </div>
  );
}
