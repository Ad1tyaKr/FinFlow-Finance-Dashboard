import { useEffect, useState } from 'react';

/**
 * Single toast notification that fades out after 2.6 s.
 */
export default function Toast({ id, msg, icon, color, onRemove }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fade   = setTimeout(() => setVisible(false), 2400);
    const remove = setTimeout(() => onRemove(id), 2800);
    return () => { clearTimeout(fade); clearTimeout(remove); };
  }, [id, onRemove]);

  return (
    <div
      className="toast"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      <div className="tdot" style={{ background: color }} />
      <span style={{ fontSize: 14 }}>{icon}</span>
      {msg}
    </div>
  );
}
