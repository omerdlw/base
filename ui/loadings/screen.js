import Icon from '@/ui/icon';
import { CN } from '@/lib/utils';

export function LoadingScreen({
  icon = 'mingcute:loading-3-fill',
  fullScreen = false,
  size = 40,
  className,
  text,
}) {
  const containerClasses = CN(
    'h-screen w-screen fixed inset-0 z-50',
    'flex flex-col items-center justify-center gap-4',
    className,
  );

  return (
    <div className={containerClasses} role='status' aria-label='Loading'>
      <div className='animate-spin'>
        <Icon className='text-skin-primary' icon={icon} size={size} />
      </div>
      {text && (
        <p className='text-skin-primary animate-pulse text-sm'>{text}</p>
      )}
    </div>
  );
}
