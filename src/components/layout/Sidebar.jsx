import { NavLink } from 'react-router-dom';
import { useTransactionContext } from '../../context/TransactionContext';

const NAV_ITEMS = [
  {
    to: '/dashboard', label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    to: '/transactions', label: 'Transactions', badge: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 7l-5-5-5 5M7 17l5 5 5-5M12 2v20"/>
      </svg>
    ),
  },
  {
    to: '/cards', label: 'My Cards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    section: 'Insights',
  },
  {
    to: '/analytics', label: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    to: '/goals', label: 'Goals',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    section: 'Resources',
  },
  {
    to: '/learn', label: 'Learn',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    to: '/security', label: 'Security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function Sidebar({ onClose }) {
  const { transactions } = useTransactionContext();

  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-mark">F</div>
        <div>
          <div className="sb-brand">FinFlow</div>
          <div className="sb-tag">Premium Finance</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        {NAV_ITEMS.map((item, idx) => {
          if (item.section) {
            return <div key={idx} className="sb-sec">{item.section}</div>;
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `sb-btn${isActive ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span className="sb-badge">{transactions.length}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-av">AK</div>
          <div>
            <div className="sb-un">Aditya Kr</div>
            <div className="sb-role">Premium Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
