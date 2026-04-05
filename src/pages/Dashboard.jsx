import { useState }              from 'react';
import { useNavigate }           from 'react-router-dom';
import { CardProvider }          from '../context/CardContext';
import { useCards }              from '../hooks/useCards';

// Dashboard widgets
import HeroBalance        from '../components/dashboard/HeroBalance';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import HealthPulse        from '../components/dashboard/HealthPulse';
import CreditScoreCard    from '../components/dashboard/CreditScoreCard';
import NetWorthList       from '../components/dashboard/NetWorthList';
import GoalsPreview       from '../components/dashboard/GoalsPreview';
import TutorialsPreview   from '../components/dashboard/TutorialsPreview';

// Card carousel (needs CardProvider wrapping it)
import CardCarousel       from '../components/cards/CardCarousel';

// Charts
import SpendBarChart      from '../components/charts/SpendBarChart';

/** Mini card widget inside the dashboard — reads from CardContext */
function DashboardCardWidget({ navigate }) {
  const { activeCard } = useCards();

  return (
    <div className="card">
      <div className="ch">
        <div className="ct">My Cards</div>
        <button className="cl" onClick={() => navigate('/cards')}>Manage →</button>
      </div>

      {/* Shared carousel — arrows, dots, stacked cards all sync */}
      <CardCarousel showArrows showInfoStrip />

      {/* Navigate to full cards page */}
      <button className="add-c" onClick={() => navigate('/cards')}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5"  y1="12" x2="19" y2="12"/>
        </svg>
        View All Cards
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [spendPeriod, setSpendPeriod] = useState('M');
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="dg">

        {/* ── LEFT COLUMN ── */}
        <div className="dl">
          {/* Balance hero */}
          <HeroBalance />

          {/*
            CardProvider scoped to the dashboard card widget only.
            This is a separate instance from MyCards page —
            each page gets its own fresh carousel state starting at card 0.
          */}
          <CardProvider>
            <DashboardCardWidget navigate={navigate} />
          </CardProvider>

          {/* Goals preview */}
          <div className="card">
            <div className="ch">
              <div className="ct">Savings Goals</div>
              <button className="cl" onClick={() => navigate('/goals')}>View All →</button>
            </div>
            <GoalsPreview />
          </div>
        </div>

        {/* ── MID COLUMN ── */}
        <div className="dm">
          {/* Spending chart */}
          <div className="card">
            <div className="ch">
              <div className="ct">Spending</div>
              <div className="pbtns">
                {['W','M','Y'].map(p => (
                  <button
                    key={p}
                    className={`pb${spendPeriod === p ? ' on' : ''}`}
                    onClick={() => setSpendPeriod(p)}
                  >{p}</button>
                ))}
              </div>
            </div>
            <SpendBarChart period={spendPeriod} />
          </div>

          {/* Recent transactions */}
          <div className="card">
            <div className="ch">
              <div className="ct">Recent Transactions</div>
              <button className="cl" onClick={() => navigate('/transactions')}>View All →</button>
            </div>
            <RecentTransactions />
          </div>

          {/* Health pulse */}
          <div className="card">
            <div className="ch"><div className="ct">Financial Health Pulse</div></div>
            <HealthPulse />
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="dr">
          {/* Credit score */}
          <div className="card">
            <div className="ch">
              <div className="ct">Credit Score</div>
              <button className="cl" onClick={() => navigate('/analytics')}>Report →</button>
            </div>
            <CreditScoreCard />
          </div>

          {/* Net worth */}
          <div className="card">
            <div className="ch"><div className="ct">Net Worth</div></div>
            <NetWorthList />
          </div>

          {/* Tutorials */}
          <div className="card">
            <div className="ch">
              <div className="ct">Learn</div>
              <button className="cl" onClick={() => navigate('/learn')}>More →</button>
            </div>
            <TutorialsPreview />
          </div>
        </div>

      </div>
    </div>
  );
}
