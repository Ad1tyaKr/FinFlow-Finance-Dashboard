import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context providers
import { ThemeProvider }       from './context/ThemeContext';
import { TransactionProvider } from './context/TransactionContext';
import { GoalProvider }        from './context/GoalContext';
import { ToastProvider }       from './context/ToastContext';

// Layout shell (sidebar + topbar + toast container)
import Shell from './components/layout/Shell';

// Pages
import Dashboard    from './pages/Dashboard';
import Transactions from './pages/Transactions';
import MyCards      from './pages/MyCards';
import Analytics    from './pages/Analytics';
import Goals        from './pages/Goals';
import Learn        from './pages/Learn';
import Security     from './pages/Security';

export default function App() {
  return (
    /*
     * Provider order matters:
     * 1. ThemeProvider     – sets data-theme attribute, no deps
     * 2. ToastProvider     – used by all other providers/pages
     * 3. TransactionProvider – depends on localStorage only
     * 4. GoalProvider        – depends on localStorage only
     * 5. BrowserRouter       – must wrap all <Route> usage
     */
    <ThemeProvider>
      <ToastProvider>
        <TransactionProvider>
          <GoalProvider>
            <BrowserRouter>
              <Shell>
                <Routes>
                  {/* Redirect root → /dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />

                  <Route path="/dashboard"    element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/cards"        element={<MyCards />} />
                  <Route path="/analytics"    element={<Analytics />} />
                  <Route path="/goals"        element={<Goals />} />
                  <Route path="/learn"        element={<Learn />} />
                  <Route path="/security"     element={<Security />} />

                  {/* Catch-all → dashboard */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Shell>
            </BrowserRouter>
          </GoalProvider>
        </TransactionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
