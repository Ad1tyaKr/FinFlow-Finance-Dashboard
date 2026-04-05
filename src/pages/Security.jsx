import { useState }             from 'react';
import { useToast }             from '../context/ToastContext';
import SecurityToggleItem       from '../components/security/SecurityToggleItem';
import StatusBadge              from '../components/security/StatusBadge';
import ActivityLog              from '../components/security/ActivityLog';
import { SECURITY_SETTINGS, SECURITY_STATUS } from '../data/netWorthData';

export default function Security() {
  const { addToast } = useToast();

  // Local copy of toggle state — security settings don't need global persistence
  const [settings, setSettings] = useState(
    SECURITY_SETTINGS.map(s => ({ ...s }))
  );

  const handleToggle = (index) => {
    setSettings(prev => {
      const next = prev.map((s, i) =>
        i === index ? { ...s, on: !s.on } : s
      );
      const updated = next[index];
      addToast(
        `${updated.name} ${updated.on ? 'enabled' : 'disabled'}`,
        updated.on ? '🔒' : '🔓',
        updated.on ? '#2dd4a0' : '#f4637a'
      );
      return next;
    });
  };

  return (
    <div className="page">
      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 21, fontWeight: 700, color: 'var(--txt)', marginBottom: 5,
        }}>
          Security Center
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--txt3)' }}>
          Protect your account and monitor access
        </div>
      </div>

      <div className="sec2">
        {/* Left: Toggle settings */}
        <div>
          <div className="ct" style={{ marginBottom: 11 }}>Protection Settings</div>
          {settings.map((s, i) => (
            <SecurityToggleItem
              key={s.name}
              setting={s}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        {/* Right: Status badges */}
        <div>
          <div className="ct" style={{ marginBottom: 11 }}>Account Status</div>
          {SECURITY_STATUS.map(s => (
            <StatusBadge key={s.label} label={s.label} value={s.val} cls={s.cls} />
          ))}
        </div>

        {/* Full-width: Activity log */}
        <div className="sec-full">
          <div className="card">
            <div className="ch">
              <div className="ct">Recent Login Activity</div>
            </div>
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
}
