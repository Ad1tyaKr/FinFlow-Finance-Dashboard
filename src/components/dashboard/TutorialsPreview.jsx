import { TUTORIALS } from '../../data/tutorialsData';

export default function TutorialsPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {TUTORIALS.slice(0, 3).map((t, i) => (
        <a
          key={t.url}
          href={t.url}
          target="_blank"
          rel="noreferrer"
          className="tut"
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <div className="tut-th" style={{ background: t.tbg }}>
            {t.emoji}
            <div className="play-o">
              <div className="play-c">
                <svg viewBox="0 0 10 12" width="8" height="8">
                  <polygon points="0,0 10,6 0,12" fill="#000" />
                </svg>
              </div>
            </div>
          </div>
          <div className="tut-i">
            <div className="tut-t">{t.title}</div>
            <div className="tut-m">
              {t.channel} · {t.dur}
              <span className="tut-tag" style={{ background: t.tbg, color: t.tc }}>
                {t.tag}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
