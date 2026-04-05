/**
 * Props:
 *   setting – { icon, name, desc, on }
 *   onToggle – () => void
 */
export default function SecurityToggleItem({ setting, onToggle }) {
  return (
    <div className="s-item">
      <div
        className="s-ico"
        style={{ background: setting.on ? 'var(--gbg)' : 'var(--sur3)' }}
      >
        {setting.icon}
      </div>

      <div className="s-info">
        <div className="s-nm">{setting.name}</div>
        <div className="s-desc">{setting.desc}</div>
      </div>

      <button
        className={`tog${setting.on ? ' on' : ''}`}
        onClick={onToggle}
        title={setting.on ? 'Disable' : 'Enable'}
      />
    </div>
  );
}
