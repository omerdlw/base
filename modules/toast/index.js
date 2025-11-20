'use client';

import { CONFIG, ANIMATION } from '@/modules/toast/config';
import { AnimatePresence, motion } from 'framer-motion';
import { Z_INDEX } from '@/config/constants';
import { useToastContext } from './context';
import Item from './item';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();
  const visibleToasts = toasts.slice(0, CONFIG.MAX_VISIBLE);

  return (
    <div
      className='fixed top-10 left-2/4 -translate-x-2/4'
      style={{
        zIndex: Z_INDEX.MODAL + CONFIG.Z_INDEX_OFFSET,
        minWidth: `${CONFIG.WIDTH}px`,
      }}
    >
      <AnimatePresence>
        {visibleToasts.map((toast, index) => {
          const total = visibleToasts.length;
          const y = index * CONFIG.OFFSET_Y;
          const scale = 1 - index * CONFIG.SCALE_OFFSET;
          const zIndex = CONFIG.Z_INDEX_OFFSET + (total - 1 - index);

          return (
            <motion.div
              animate={ANIMATION.getAnimate(y, scale)}
              className='absolute top-0 left-0 w-full'
              exit={ANIMATION.getExit(y, scale)}
              initial={ANIMATION.initial}
              key={toast.id}
              style={{
                zIndex: zIndex,
              }}
              transition={ANIMATION.transition}
            >
              <Item toast={toast} onClose={() => removeToast(toast.id)} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
