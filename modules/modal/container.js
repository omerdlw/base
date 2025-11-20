import { CN } from '@/lib/utils';
import Title from './title';

export default function Container({ header, close, children, className }) {
  return (
    <div className='flex w-full min-w-md flex-col items-center'>
      <Title {...header} close={close} />
      <div className={CN('h-auto w-full p-4', className)}>{children}</div>
    </div>
  );
}
