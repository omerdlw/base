import Icon from '@/ui/icon';
import { CN } from '@/lib/utils';

export function LoadingSpinner({ size = 20, className }) {
  return (
    <div
      className={CN('inline-block animate-spin', className)}
      aria-label='Loading'
      role='status'
    >
      <Icon icon='mingcute:loading-3-fill' size={size} />
    </div>
  );
}
