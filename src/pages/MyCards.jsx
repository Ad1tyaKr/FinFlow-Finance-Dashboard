import { CardProvider }      from '../context/CardContext';
import { useCards }          from '../hooks/useCards';
import { useToast }          from '../context/ToastContext';
import CardCarousel          from '../components/cards/CardCarousel';
import CardDetailsPanel      from '../components/cards/CardDetailsPanel';
import CardsOverviewGrid     from '../components/cards/CardsOverviewGrid';
import SpendBarChart         from '../components/charts/SpendBarChart';
import { MONTHS }            from '../data/cardData';
import Button                from '../components/ui/Button';

function MyCardsInner() {
  const { activeCard } = useCards();
  const { addToast }   = useToast();

  return (
    <div className="page">

      {/* ── Page header ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 22, flexWrap: 'wrap', gap: 10,
      }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:21, fontWeight:700, color:'var(--txt)' }}>
            My Cards
          </div>
          <div style={{ fontSize:12.5, color:'var(--txt3)', marginTop:3 }}>
            Manage and switch between your cards
          </div>
        </div>
        <Button variant="gold" onClick={() => addToast('Add card flow coming soon','💳','#c9a84c')}>
          + Add New Card
        </Button>
      </div>

      {/* ── Main 2-col grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 22,
        marginBottom: 22,
      }}>

        {/* LEFT: Single unified carousel (full mode) + balance + actions */}
        <div className="card" style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'28px 22px' }}>

          <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'var(--txt3)', marginBottom:10 }}>
            YOUR CARDS
          </div>

          {/*
            showFull=true renders:
            - Large active card with full details
            - Two peek-shadow cards stacked behind it
            - Prev/next arrows
            - Dot indicators
            All in one unified component — no duplicate card objects.
          */}
          <CardCarousel showFull showArrows />

          {/* Balance + quick actions */}
          <div style={{ width:'100%', background:'var(--sur2)', borderRadius:12, padding:'14px 16px', marginTop:4 }}>
            <div style={{ fontSize:10, color:'var(--txt3)', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>
              Available Balance
            </div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:'var(--gold)', marginBottom:14, transition:'all .3s' }}>
              ${activeCard.balance.toLocaleString('en-US', { minimumFractionDigits:2 })}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="gold"  size="sm" style={{ flex:1 }} onClick={() => addToast('Pay bill opened','💸','#c9a84c')}>Pay Bill</Button>
              <Button variant="ghost" size="sm" style={{ flex:1 }} onClick={() => addToast('Transfer opened','🔄','#4d9ef7')}>Transfer</Button>
              <Button variant="ghost" size="sm" style={{ flex:1 }} onClick={() => addToast('Card frozen!','🧊','#4d9ef7')}>Freeze</Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Details + per-card spend chart */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          <div className="card">
            <div className="ch"><div className="ct">Card Details</div></div>
            <CardDetailsPanel />
          </div>

          <div className="card">
            <div className="ch">
              <div className="ct">{activeCard.type} — Monthly Spend</div>
            </div>
            <SpendBarChart data={activeCard.spend} labels={MONTHS} />
          </div>

        </div>
      </div>

      {/* ── All cards overview ── */}
      <div className="card">
        <div className="ch"><div className="ct">All Cards Overview</div></div>
        <CardsOverviewGrid />
      </div>

    </div>
  );
}

export default function MyCards() {
  return (
    <CardProvider>
      <MyCardsInner />
    </CardProvider>
  );
}
