import CreditGaugeChart from '../charts/CreditGaugeChart';

const FACTORS = [
  { name: 'Payment History', pct: 92,  color: 'var(--green)', label: '92%' },
  { name: 'Credit Usage',    pct: 28,  color: 'var(--blue)',  label: '28%' },
  { name: 'Account Age',     pct: 75,  color: 'var(--amber)', label: '7yr' },
  { name: 'Inquiries',       pct: 88,  color: 'var(--green)', label: 'Low' },
];

export default function CreditScoreCard() {
  return (
    <div className="gw">
      <CreditGaugeChart score={745} />

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '0 4px', marginBottom: 11, fontSize: 10,
      }}>
        <span style={{ color: 'var(--red)'   }}>Poor</span>
        <span style={{ color: 'var(--amber)' }}>Fair</span>
        <span style={{ color: 'var(--green)', fontWeight: 700 }}>Good ✓</span>
        <span style={{ color: 'var(--blue)'  }}>Excellent</span>
      </div>

      <div className="sfs">
        {FACTORS.map(f => (
          <div key={f.name} className="sf">
            <div className="sf-n">{f.name}</div>
            <div className="sf-b">
              <div className="sf-f" style={{ width: `${f.pct}%`, background: f.color }} />
            </div>
            <div className="sf-p">{f.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
