import { useState, useMemo } from 'react';
import { TUTORIALS }         from '../../data/tutorialsData';
import LearnCard             from './LearnCard';

const ALL_CATS = ['All', ...new Set(TUTORIALS.map(t => t.cat))];

export default function LearnGrid() {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = useMemo(() =>
    activeCat === 'All' ? TUTORIALS : TUTORIALS.filter(t => t.cat === activeCat),
    [activeCat]
  );

  return (
    <>
      {/* Category filter pills */}
      <div className="lcats">
        {ALL_CATS.map(cat => (
          <button
            key={cat}
            className={`lcat${cat === activeCat ? ' on' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="lgrid">
        {filtered.map((t, i) => (
          <LearnCard key={t.url} tutorial={t} delay={i * 0.07} />
        ))}
      </div>
    </>
  );
}
