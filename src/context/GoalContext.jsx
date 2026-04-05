import { createContext, useContext } from 'react';
import { useLocalStorage }           from '../hooks/useLocalStorage';
import { SEED_GOALS }                from '../data/seedGoals';

const GoalContext = createContext(null);

export function GoalProvider({ children }) {
  const [goals, setGoals] = useLocalStorage('v_goals', SEED_GOALS);

  const addGoal = (goal) =>
    setGoals(prev => [...prev, { ...goal, id: Date.now() }]);

  const updateGoal = (id, patch) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g));

  const deleteGoal = (id) =>
    setGoals(prev => prev.filter(g => g.id !== id));

  const addFunds = (id, amount) =>
    setGoals(prev => prev.map(g =>
      g.id === id ? { ...g, current: Math.min(g.target, g.current + amount) } : g
    ));

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal, addFunds }}>
      {children}
    </GoalContext.Provider>
  );
}

export const useGoalContext = () => {
  const ctx = useContext(GoalContext);
  if (!ctx) throw new Error('useGoalContext must be inside GoalProvider');
  return ctx;
};
