import { useCards } from '../../hooks/useCards';

/**
 * Unified card carousel.
 *
 * On the MyCards page (showFull=true):
 *   - Shows the active card LARGE (185px tall) with full details
 *   - The other two cards peek as a small stacked shadow behind/below it
 *   - Prev/Next arrows on the sides
 *   - Dot indicators below
 *
 * On the Dashboard (showFull=false, default):
 *   - Classic compact stacked view (150px)
 *   - Optional info strip below
 */
export default function CardCarousel({
  showFull      = false,
  showArrows    = true,
  showInfoStrip = true,
}) {
  const { cards, activeIndex, activeCard, selectCard, prevCard, nextCard } = useCards();

  const arrowBtn = (onClick, side, label) => (
    <button
      onClick={onClick}
      title={label}
      style={{
        position: 'absolute',
        [side]: showFull ? -14 : -10,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: 32, height: 32,
        borderRadius: '50%',
        border: '1px solid var(--bdr2)',
        background: 'var(--sur2)',
        color: 'var(--txt2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 18,
        transition: 'all .18s',
      }}
      onMouseOver={e => { e.currentTarget.style.background = 'var(--gg)'; e.currentTarget.style.color = 'var(--gold)'; }}
      onMouseOut={e  => { e.currentTarget.style.background = 'var(--sur2)'; e.currentTarget.style.color = 'var(--txt2)'; }}
    >
      {side === 'left' ? '‹' : '›'}
    </button>
  );

  /* ─── FULL VIEW (MyCards page) ─────────────────────────────────── */
  if (showFull) {
    return (
      <div style={{ width: '100%', maxWidth: 340, margin: '0 auto' }}>

        {/* Card stack area */}
        <div style={{ position: 'relative', userSelect: 'none', marginBottom: 18 }}>
          {showArrows && arrowBtn(prevCard, 'left', 'Previous card (←)')}
          {showArrows && arrowBtn(nextCard, 'right', 'Next card (→)')}

          {/* Stack container */}
          <div style={{ position: 'relative', height: 220, paddingTop: 10 }}>

            {/* Back card (peek shadow) */}
            <div style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%) scale(.92)',
              width: '90%', height: 185,
              borderRadius: 18,
              background: cards[(activeIndex + 2) % 3].grad,
              opacity: 0.35,
              zIndex: 1,
              transition: 'all .4s cubic-bezier(.4,0,.2,1)',
            }} />

            {/* Middle card (peek shadow) */}
            <div style={{
              position: 'absolute', bottom: 6, left: '50%',
              transform: 'translateX(-50%) scale(.96)',
              width: '95%', height: 185,
              borderRadius: 18,
              background: cards[(activeIndex + 1) % 3].grad,
              opacity: 0.55,
              zIndex: 2,
              transition: 'all .4s cubic-bezier(.4,0,.2,1)',
            }} />

            {/* Front card — full active card */}
            <div
              onClick={nextCard}
              style={{
                position: 'absolute', bottom: 12, left: 0, right: 0,
                height: 185, borderRadius: 18, padding: '20px 22px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                background: activeCard.grad,
                zIndex: 3,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'background .4s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,.4)',
              }}
            >
              {/* Decorative glows */}
              <div style={{ position:'absolute',top:-40,right:-40,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,.08)',pointerEvents:'none' }} />
              <div style={{ position:'absolute',bottom:-30,left:20,width:100,height:100,borderRadius:'50%',background:'rgba(255,255,255,.04)',pointerEvents:'none' }} />

              {/* Top row */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', position:'relative', zIndex:1 }}>
                <div style={{ width:32, height:23, borderRadius:4, background:'linear-gradient(135deg,#d4af37,#f5d980)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, padding:3 }}>
                  <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                  <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                  <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                  <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                </div>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', color:'rgba(255,255,255,.7)' }}>
                  {activeCard.type}
                </div>
              </div>

              {/* Card number */}
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:15, color:'rgba(255,255,255,.8)', letterSpacing:'.14em', position:'relative', zIndex:1 }}>
                {activeCard.num}
              </div>

              {/* Bottom row */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', position:'relative', zIndex:1 }}>
                <div>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:2 }}>Card Holder</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.9)', fontWeight:600 }}>{activeCard.name}</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:2 }}>Expires</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'rgba(255,255,255,.75)' }}>{activeCard.exp}</div>
                </div>
                <div style={{ fontSize:15, fontWeight:800, color:'rgba(255,255,255,.8)' }}>{activeCard.brand}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="cdots" style={{ marginBottom: 16 }}>
          {cards.map((_, i) => (
            <div
              key={i}
              className={`cdot${i === activeIndex ? ' on' : ''}`}
              onClick={() => selectCard(i)}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ─── COMPACT VIEW (Dashboard) ─────────────────────────────────── */
  return (
    <div>
      <div style={{ position: 'relative', userSelect: 'none' }}>
        {showArrows && arrowBtn(prevCard, 'left', 'Previous card (←)')}
        {showArrows && arrowBtn(nextCard, 'right', 'Next card (→)')}

        {/* Stacked compact cards */}
        <div style={{ position: 'relative', height: 150, marginBottom: 12 }}>
          {cards.map((card, i) => {
            const diff = (i - activeIndex + 3) % 3;
            return (
              <div
                key={card.id}
                onClick={() => selectCard(i)}
                style={{
                  position: 'absolute', width: '100%', height: 138,
                  borderRadius: 13, padding: '15px 17px',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: card.grad,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  zIndex: 3 - diff,
                  transform: diff === 0 ? 'scale(1)' : diff === 1 ? 'scale(.97) translateY(10px)' : 'scale(.94) translateY(20px)',
                  opacity: diff === 0 ? 1 : diff === 1 ? 0.7 : 0.45,
                  transition: 'all .35s cubic-bezier(.4,0,.2,1)',
                }}
              >
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div style={{ width:25, height:18, borderRadius:3, background:'linear-gradient(135deg,#d4af37,#f5d980)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, padding:2 }}>
                    <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                    <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                    <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                    <div style={{ background:'rgba(0,0,0,.2)', borderRadius:1 }} />
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.08em', color:'rgba(255,255,255,.65)' }}>{card.type}</div>
                </div>
                <div />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                  <div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'rgba(255,255,255,.7)', letterSpacing:'.1em' }}>{card.num}</div>
                    <div style={{ fontSize:10.5, color:'rgba(255,255,255,.8)', fontWeight:500, marginTop:3 }}>{card.name}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    {card.exp && <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:'rgba(255,255,255,.55)' }}>{card.exp}</div>}
                    <div style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,.7)' }}>{card.brand}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="cdots" style={{ marginBottom: showInfoStrip ? 10 : 0 }}>
        {cards.map((_, i) => (
          <div key={i} className={`cdot${i === activeIndex ? ' on' : ''}`} onClick={() => selectCard(i)} />
        ))}
      </div>

      {/* Info strip */}
      {showInfoStrip && (
        <div style={{ background:'var(--sur2)', borderRadius:9, padding:'10px 13px', marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10, color:'var(--txt3)', marginBottom:2 }}>ACTIVE CARD</div>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--txt)' }}>
              {['Premium Gold','Debit Card','Savings Account'][activeIndex]}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:10, color:'var(--txt3)', marginBottom:2 }}>BALANCE</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13.5, fontWeight:600, color:'var(--gold)' }}>
              ${activeCard.balance.toLocaleString('en-US', { minimumFractionDigits:2 })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
