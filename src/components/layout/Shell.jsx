import { useState, useEffect } from 'react';
import Sidebar        from './Sidebar';
import Topbar         from './Topbar';
import ToastContainer from '../ui/ToastContainer';

/**
 * Root layout: fixed sidebar + sticky topbar + scrollable content.
 * Handles mobile sidebar open/close.
 */
export default function Shell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  const closeSidebar = () => setSidebarOpen(false);

  // Prevent body scroll when sidebar overlay is open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sb-overlay"
          style={{ display: 'block' }}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar — gets .open class on mobile */}
      <div style={{ position: 'relative' }}>
        <aside
          className={`sidebar${sidebarOpen ? ' open' : ''}`}
          id="sidebar"
        >
          <Sidebar onClose={closeSidebar} />
        </aside>
      </div>

      {/* Main */}
      <div className="main">
        <Topbar onHamburger={() => setSidebarOpen(o => !o)} />
        <main>{children}</main>
      </div>

      {/* Global toast layer */}
      <ToastContainer />
    </div>
  );
}
