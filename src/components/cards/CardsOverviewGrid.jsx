import { useCards } from '../../hooks/useCards';

/** Horizontal strip showing all cards at a glance; clicking selects one. */
export default function CardsOverviewGrid() {
  const { cards, activeIndex, selectCard } = useCards();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 14,
    }}>
      {cards.map((cd, i) => (
        <div
          key={cd.id}
          onClick={() => selectCard(i)}
          style={{
            borderRadius: 12,
            border: `2px solid ${i === activeIndex ? 'var(--gold)' : 'var(--bdr)'}`,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all .2s',
            background: i === activeIndex ? 'var(--gg)' : 'var(--sur2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: 'var(--txt3)' }}>
              {cd.type}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: i === activeIndex ? 'var(--gold)' : 'var(--txt3)',
            }}>
              {cd.brand}
            </div>
          </div>

          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 12,
            color: 'var(--txt2)', marginBottom: 8,
          }}>
            {cd.num}
          </div>

          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
            color: i === activeIndex ? 'var(--gold)' : 'var(--txt)',
          }}>
            ${cd.balance.toLocaleString()}
          </div>

          <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3 }}>
            Available Balance
          </div>
        </div>
      ))}
    </div>
  );
}
