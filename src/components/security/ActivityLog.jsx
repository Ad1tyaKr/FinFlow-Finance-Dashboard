import { SECURITY_ACTIVITY } from '../../data/netWorthData';

export default function ActivityLog() {
  return (
    <>
      {SECURITY_ACTIVITY.map((a, i) => (
        <div key={i} className="act-r">
          <div
            className="act-i"
            style={{ background: a.ok ? 'var(--gbg)' : 'var(--rbg)' }}
          >
            {a.icon}
          </div>
          <div className="act-inf">
            <div className="act-nm">{a.name}</div>
            <div className="act-tm">{a.time}</div>
          </div>
          <div className={`act-st ${a.ok ? 'ok' : 'bad'}`}>
            {a.ok ? 'Authorized' : 'Blocked'}
          </div>
        </div>
      ))}
    </>
  );
}
