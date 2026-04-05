/**
 * Inline coloured pill badge.
 * variant: 'income' | 'expense' | 'ok' | 'warn' | 'bad' | 'custom'
 * For 'custom' pass color and bg as hex strings.
 */
export default function Badge({ children, variant = 'income', color, bg }) {
  if (variant === 'custom') {
    return (
      <span
        className="cat-p"
        style={{ background: bg, color }}
      >
        {children}
      </span>
    );
  }

  const cls = {
    income:  'cat-p b-in',
    expense: 'cat-p b-ex',
    ok:      's-badge s-ok',
    warn:    's-badge s-warn',
    bad:     's-badge s-bad',
  }[variant] || 'cat-p';

  return <span className={cls}>{children}</span>;
}
