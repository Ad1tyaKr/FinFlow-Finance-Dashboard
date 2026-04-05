/**
 * Single visual bank card.
 * Props:
 *   card        – object from CARD_DATA
 *   index       – position in stack (0=front, 1=mid, 2=back)
 *   activeIndex – which card is currently on top
 *   onClick     – called with card index when clicked
 */
export default function BankCard({ card, index, activeIndex, onClick }) {
  const diff = (index - activeIndex + 3) % 3;

  const style = {
    zIndex:    3 - diff,
    transform: diff === 0 ? 'scale(1)' : diff === 1 ? 'scale(.97) translateY(10px)' : 'scale(.94) translateY(20px)',
    opacity:   diff === 0 ? 1 : diff === 1 ? 0.7 : 0.45,
  };

  return (
    <div
      className={`bc ${card.className}`}
      style={style}
      onClick={() => onClick(index)}
    >
      {/* Top row: chip + card type label */}
      <div className="bc-top">
        <div className="chip">
          <div /><div /><div /><div />
        </div>
        <div className="bc-type">{card.type}</div>
      </div>

      {/* Spacer */}
      <div />

      {/* Bottom row: number, name, expiry, brand */}
      <div className="bc-bot">
        <div>
          <div className="bc-num">{card.num}</div>
          <div className="bc-name">{card.name}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {card.exp && <div className="bc-exp">{card.exp}</div>}
          <div className="bc-brand">{card.brand}</div>
        </div>
      </div>
    </div>
  );
}
