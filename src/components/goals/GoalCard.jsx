import { useGoals }       from '../../hooks/useGoals';
import { useToast }       from '../../context/ToastContext';
import GoalProgressBar    from './GoalProgressBar';
import Button             from '../ui/Button';
import { fmt, fmtDate }  from '../../utils/formatters';

/**
 * Props:
 *   goal – single goal object
 */
export default function GoalCard({ goal }) {
  const { deleteGoal, addFunds, progressOf, daysLeft } = useGoals();
  const { addToast } = useToast();

  const pct  = progressOf(goal);
  const days = daysLeft(goal.deadline);

  const handleAddFunds = () => {
    const raw = prompt('How much to add? ($)');
    const amt = parseFloat(raw);
    if (isNaN(amt) || amt <= 0) return;
    addFunds(goal.id, amt);
    addToast(`${fmt(amt)} added to ${goal.name}`, '💰', '#2dd4a0');
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this goal?')) return;
    deleteGoal(goal.id);
    addToast('Goal removed', '🗑️', '#f4637a');
  };

  return (
    <div className="gc-card">
      {/* Header */}
      <div className="gc-top">
        <div className="gc-ico">{goal.icon}</div>
        <div>
          <div className="gc-nm">{goal.name}</div>
          <div className="gc-cat">{goal.category || 'Personal'}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="gc-prow">
        <span className="gc-pl">Progress</span>
        <span className="gc-pv">{pct}%</span>
      </div>
      <GoalProgressBar pct={pct} />

      {/* Amounts */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: 'var(--txt3)',
        fontFamily: "'DM Mono', monospace", marginBottom: 2,
      }}>
        <span>{fmt(goal.current)} saved</span>
        <span>{fmt(goal.target)} goal</span>
      </div>

      {/* Deadline */}
      {days !== null && (
        <div className="gc-dl">
          <span>{fmtDate(goal.deadline)}</span>
          <span style={{ color: days < 30 ? 'var(--red)' : 'var(--txt3)' }}>
            {days > 0 ? `${days} days left` : 'Past deadline'}
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
        <Button variant="ghost" size="sm" onClick={handleAddFunds} style={{ flex: 1 }}>
          + Add Funds
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          🗑
        </Button>
      </div>
    </div>
  );
}
