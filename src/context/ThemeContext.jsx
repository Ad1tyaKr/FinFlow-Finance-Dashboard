import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

// Read stored theme synchronously so we apply it before first render
function getInitialTheme() {
  try {
    const stored = localStorage.getItem('v_theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  return 'dark';
}

// Apply theme to <html> immediately — called at module level so it
// runs before React paints anything, eliminating the flash.
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const t = getInitialTheme();
    applyTheme(t); // synchronous — no useEffect flash
    return t;
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('v_theme', next); } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
