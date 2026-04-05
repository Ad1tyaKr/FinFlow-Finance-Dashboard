import { useState } from 'react';

/**
 * Like useState but syncs to localStorage automatically.
 * @param {string} key      - localStorage key
 * @param {*}      initial  - fallback value if key is not found
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });

  const set = (nextValue) => {
    const resolved = typeof nextValue === 'function' ? nextValue(value) : nextValue;
    setValue(resolved);
    localStorage.setItem(key, JSON.stringify(resolved));
  };

  return [value, set];
}
