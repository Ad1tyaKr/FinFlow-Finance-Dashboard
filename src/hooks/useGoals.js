import { useGoalContext } from '../context/GoalContext';

/**
 * Thin hook — wraps GoalContext and adds derived helpers.
 */
export function useGoals() {
  const ctx = useGoalContext();

  const progressOf = (goal) =>
    Math.min(100, Math.round((goal.current / goal.target) * 100));

  const daysLeft = (deadline) => {
    if (!deadline) return null;
    return Math.ceil((new Date(deadline) - new Date()) / 86_400_000);
  };

  return { ...ctx, progressOf, daysLeft };
}
