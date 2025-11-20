import { CN } from '@/lib/utils';

export function Sekeleton({ className }) {
  return (
    <div
      className={CN(
        'rounded-primary border-default/10 absolute left-1/2 h-auto w-[300px] -translate-x-1/2 cursor-pointer border bg-black/40 p-3 backdrop-blur-lg',
        className,
      )}
    >
      <div className='flex h-auto animate-pulse items-center gap-3'>
        <div className='rounded-primary bg-default/10 h-[52px] w-[52px]' />
        <div className='flex flex-1 flex-col space-y-1 overflow-hidden'>
          <div className='bg-default/10 rounded-tertiary h-4 w-3/4' />
          <div className='bg-default/10 rounded-tertiary mt-1 h-3 w-1/2' />
        </div>
      </div>
    </div>
  );
}
