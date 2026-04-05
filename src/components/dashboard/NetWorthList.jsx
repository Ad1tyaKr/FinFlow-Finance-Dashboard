import { NET_WORTH_DATA } from '../../data/netWorthData';

export default function NetWorthList() {
  return (
    <>
      {NET_WORTH_DATA.map(n => (
        <div key={n.name} className="nwr">
          <div className="nw-i" style={{ background: n.bg }}>{n.icon}</div>
          <div className="nw-inf">
            <div className="nw-n">{n.name}</div>
            <div className="nw-t">{n.type}</div>
          </div>
          <div className="nw-r">
            <div className="nw-a">{n.amount}</div>
            <div className={`nw-c ${n.dir}`}>{n.change}</div>
          </div>
        </div>
      ))}
      <div className="nw-tot">
        <div><div className="nw-tl">Total Net Worth</div></div>
        <div className="nw-tv">$31,180</div>
      </div>
    </>
  );
}
