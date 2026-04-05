/**
 * Reusable Button component.
 * variant: 'gold' | 'ghost' | 'danger'
 * size:    'sm' | 'md' (default)
 */
export default function Button({
  children,
  onClick,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  disabled = false,
  style = {},
  className = '',
}) {
  const base = 'btn';
  const variantClass = {
    gold:   'btn-gold',
    ghost:  'btn-ghost',
    danger: 'btn-ghost',
  }[variant] || 'btn-ghost';

  const sizeStyle = size === 'sm'
    ? { padding: '6px 12px', fontSize: '11.5px', borderRadius: '8px' }
    : {};

  const dangerStyle = variant === 'danger'
    ? { color: 'var(--red)', borderColor: 'var(--red)' }
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClass} ${className}`}
      style={{ ...sizeStyle, ...dangerStyle, ...style }}
    >
      {children}
    </button>
  );
}
