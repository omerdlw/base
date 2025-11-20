import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Iconify from '@/ui/icon';

export const Description = ({ text }) => {
  return (
    <div className='relative h-auto w-full'>
      <AnimatePresence mode='wait'>
        <motion.p
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.15 }}
          initial={{ opacity: 0, y: 5 }}
          exit={{ opacity: 0, y: -5 }}
          className='text-sm'
          key={text}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export const Icon = ({ icon, isStackHovered }) => {
  const isUrl = typeof icon === 'string' && icon.startsWith('http');

  if (isUrl) {
    return (
      <div
        className='rounded-secondary h-[52px] w-[52px] bg-cover bg-center bg-no-repeat transition'
        style={{ backgroundImage: `url(${icon})` }}
      />
    );
  }

  return (
    <div
      className={classNames(
        'rounded-secondary bg-default/5 flex size-[52px] items-center justify-center transition',
        {
          'bg-primary text-white': isStackHovered,
        },
      )}
    >
      <span className='text-2xl'>
        <Iconify size={30} icon={icon} />
      </span>
    </div>
  );
};

export const Title = ({ text }) => {
  return <h3 className='pr-4 font-semibold'>{text}</h3>;
};
