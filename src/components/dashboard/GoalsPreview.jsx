import { useGoals } from '../../hooks/useGoals';
import { fmt }      from '../../utils/formatters';

export default function GoalsPreview() {
  const { goals, progressOf } = useGoals();
  const preview = goals.slice(0, 2);

  if (!preview.length) {
    return (
      <div style={{ color: 'var(--txt3)', fontSize: 12, textAlign: 'center', padding: '16px 0' }}>
        No goals yet. Add one on the Goals page.
      </div>
    );
  }

  return (
    <>
      {preview.map(g => {
        const pct = progressOf(g);
        return (
          <div key={g.id} style={{ marginBottom: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--txt)' }}>
                {g.icon} {g.name}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>{pct}%</span>
            </div>
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${pct}%` }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 10.5, color: 'var(--txt3)', fontFamily: "'DM Mono', monospace",
            }}>
              <span>{fmt(g.current)}</span>
              <span>{fmt(g.target)}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
