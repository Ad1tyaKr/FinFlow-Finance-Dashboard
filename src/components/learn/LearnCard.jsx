/**
 * Props:
 *   tutorial – object from TUTORIALS array
 *   delay    – animation delay in seconds
 */
export default function LearnCard({ tutorial: t, delay = 0 }) {
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noreferrer"
      className="lcard"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Thumbnail */}
      <div className="lth" style={{ background: t.tbg }}>
        <div>{t.emoji}</div>
        <div className="yt-badge">
          <svg viewBox="0 0 24 24" width="11" height="11">
            <path
              d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v1.9c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.5 12 21.5 12 21.5s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-1.9C23.3 9.1 23 7 23 7z"
              fill="white"
            />
            <polygon points="9.8,15.6 15.8,11.9 9.8,8.2" fill="red" />
          </svg>
          YouTube
        </div>
      </div>

      {/* Body */}
      <div className="lbody">
        <div className="lt">{t.title}</div>
        <div className="lmeta">
          {t.channel} · {t.dur}
          <span className="ltag" style={{ background: t.tbg, color: t.tc }}>{t.tag}</span>
        </div>
        <div className="ldesc">{t.desc}</div>
      </div>
    </a>
  );
}
