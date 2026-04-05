import { useState }      from 'react';
import { useGoalContext } from '../context/GoalContext';
import { useToast }       from '../context/ToastContext';
import GoalCard           from '../components/goals/GoalCard';
import Button             from '../components/ui/Button';

function GoalModal({ onClose, onSave }) {
  const [name,     setName]     = useState('');
  const [target,   setTarget]   = useState('');
  const [saved,    setSaved]    = useState('');
  const [deadline, setDeadline] = useState('');
  const [icon,     setIcon]     = useState('🎯');
  const [error,    setError]    = useState('');

  const handleSave = () => {
    if (!name.trim() || !target || isNaN(Number(target)) || Number(target) <= 0) {
      setError('Goal name and a valid target amount are required.');
      return;
    }
    onSave({
      name:     name.trim(),
      target:   Number(target),
      current:  Number(saved) || 0,
      deadline,
      icon:     icon || '🎯',
      category: 'Personal',
    });
  };

  return (
    <div className="mbg open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="mtitle">New Savings Goal</div>
        {error && <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 10 }}>{error}</div>}
        <div className="fr"><label className="fl">Goal Name</label>
          <input className="fi" placeholder="e.g. Vacation Fund" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="fr"><label className="fl">Target Amount ($)</label>
          <input className="fi" type="number" placeholder="5000" value={target} onChange={e => setTarget(e.target.value)} />
        </div>
        <div className="fr"><label className="fl">Already Saved ($)</label>
          <input className="fi" type="number" placeholder="0" value={saved} onChange={e => setSaved(e.target.value)} />
        </div>
        <div className="fr"><label className="fl">Deadline</label>
          <input className="fi" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <div className="fr"><label className="fl">Icon (emoji)</label>
          <input className="fi" placeholder="🎯" maxLength={2} value={icon} onChange={e => setIcon(e.target.value)} />
        </div>
        <div className="mf">
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="gold"  onClick={handleSave} style={{ flex: 2 }}>Create Goal</Button>
        </div>
      </div>
    </div>
  );
}

export default function Goals() {
  const { goals, addGoal } = useGoalContext();
  const { addToast }       = useToast();
  const [showModal, setShowModal] = useState(false);

  const handleSave = (goalData) => {
    addGoal(goalData);
    addToast('Goal created!', '🎯', '#c9a84c');
    setShowModal(false);
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10,
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: 'var(--txt)' }}>
            Savings Goals
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--txt3)', marginTop: 3 }}>
            Track your financial milestones
          </div>
        </div>
        <Button variant="gold" onClick={() => setShowModal(true)}>+ New Goal</Button>
      </div>

      {/* Goals grid */}
      <div className="gg">
        {goals.map(g => <GoalCard key={g.id} goal={g} />)}

        {/* Add button card */}
        <button className="add-goal" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
          New Savings Goal
        </button>
      </div>

      {showModal && (
        <GoalModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
