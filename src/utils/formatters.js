/** Format a number as currency, always positive display */
export const fmt = (n) =>
  '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** Format an ISO date string to "Jan 5, 2025" */
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/** Category → emoji icon */
export const ICONS = {
  Food: '🍽️', Housing: '🏠', Transport: '🚗', Health: '🏥',
  Entertainment: '🎬', Utilities: '⚡', Shopping: '🛍️',
  Education: '📚', Income: '💰', Other: '📦',
};

/** Category → hex colour */
export const CAT_COLORS = {
  Housing: '#6366f1', Food: '#f59e0b', Entertainment: '#ec4899',
  Health: '#10b981', Utilities: '#3b82f6', Transport: '#8b5cf6',
  Shopping: '#f97316', Education: '#14b8a6', Income: '#22c55e', Other: '#94a3b8',
};

/** All selectable categories for form dropdowns */
export const CATEGORIES = [
  'Food','Housing','Transport','Health',
  'Entertainment','Utilities','Shopping','Education','Income','Other',
];
