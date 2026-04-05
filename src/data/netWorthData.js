export const NET_WORTH_DATA = [
  { icon:'🏠', name:'Real Estate',   type:'Asset',         amount:'$12,500', change:'+2.1%',    dir:'up', bg:'rgba(34,197,94,.1)'   },
  { icon:'📈', name:'Investments',   type:'Stocks & ETFs', amount:'$8,340',  change:'+5.8%',    dir:'up', bg:'rgba(77,158,247,.1)'  },
  { icon:'🏦', name:'Savings',       type:'FDIC Insured',  amount:'$6,890',  change:'+0.4%',    dir:'up', bg:'rgba(245,166,35,.1)'  },
  { icon:'💳', name:'Credit Card',   type:'Liability',     amount:'-$320',   change:'Due Jan 5',dir:'dn', bg:'rgba(244,99,122,.1)'  },
];

export const SECURITY_SETTINGS = [
  { icon:'🔐', name:'Two-Factor Authentication', desc:'Adds an extra layer of security',       on:true  },
  { icon:'🔔', name:'Login Alerts',               desc:'Get notified of every login',           on:true  },
  { icon:'📍', name:'Location Lock',              desc:'Block logins from unknown locations',   on:false },
  { icon:'🛡️', name:'Transaction Alerts',        desc:'Real-time spending notifications',      on:true  },
];

export const SECURITY_STATUS = [
  { label:'Password Strength',    val:'Strong',      cls:'s-ok'   },
  { label:'Last Password Change', val:'45 days ago', cls:'s-ok'   },
  { label:'Linked Devices',       val:'3 devices',   cls:'s-warn' },
  { label:'Verification',         val:'Verified ✓',  cls:'s-ok'   },
];

export const SECURITY_ACTIVITY = [
  { icon:'💻', name:'Chrome · macOS',     time:'Today, 9:42 AM',   ok:true  },
  { icon:'📱', name:'iPhone 15 · iOS',    time:'Yesterday, 8:15 PM',ok:true  },
  { icon:'❓', name:'Unknown · Windows',  time:'Dec 28, 3:30 AM',  ok:false },
  { icon:'💻', name:'Safari · macOS',     time:'Dec 26, 10:11 AM', ok:true  },
];
