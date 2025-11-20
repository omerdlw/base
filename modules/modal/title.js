import { motion } from 'framer-motion';
import Icon from '@/ui/icon';

export default function Title({ title, close, description }) {
  return (
    <motion.div className='border-default/10 flex w-full items-center justify-between space-x-5 border-b p-4'>
      <div className='flex h-full w-full flex-col items-start px-1'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {description && (
          <p className='line-clamp-1 text-sm opacity-70'>{description}</p>
        )}
      </div>
      <div
        className='rounded-tertiary center bg-default/10 hover:border-default/10 size-10 shrink-0 cursor-pointer border border-transparent transition hover:bg-transparent'
        onClick={() => close()}
      >
        <Icon icon='ci:close-md' />
      </div>
    </motion.div>
  );
}
