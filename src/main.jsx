import React    from 'react';
import ReactDOM  from 'react-dom/client';

// Register Chart.js components once before anything renders
import './utils/chartHelpers';

// Global styles (CSS variables, reset, all shared class names)
import './styles/themes.css';
import './styles/globals.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
