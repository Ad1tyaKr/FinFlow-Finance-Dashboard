import { useToast }  from '../../context/ToastContext';
import Toast         from './Toast';

/**
 * Renders all active toasts in the bottom-right corner.
 * Place this once inside Shell.jsx so it's always mounted.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-area">
      {toasts.map(t => (
        <Toast
          key={t.id}
          id={t.id}
          msg={t.msg}
          icon={t.icon}
          color={t.color}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}
