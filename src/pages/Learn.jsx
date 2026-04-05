import LearnGrid from '../components/learn/LearnGrid';

export default function Learn() {
  return (
    <div className="page">
      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 21, fontWeight: 700, color: 'var(--txt)', marginBottom: 5,
        }}>
          Financial Education
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--txt3)' }}>
          Curated tutorials to master your money
        </div>
      </div>

      {/* Category filter + grid — all logic lives in LearnGrid */}
      <LearnGrid />
    </div>
  );
}
