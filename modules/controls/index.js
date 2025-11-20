'use client';

import { useControlsContext } from '@/modules/controls/context';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIG } from './config';

export default function Controls() {
  const { leftControls, rightControls } = useControlsContext();
  const hasControls = leftControls || rightControls;

  return (
    <div className={CONFIG.STYLES.CONTAINER}>
      <AnimatePresence>
        {hasControls && (
          <motion.div
            className={CONFIG.STYLES.INNER_CONTAINER}
            initial={CONFIG.VARIANTS.initial}
            animate={CONFIG.VARIANTS.animate}
            transition={CONFIG.ANIMATION}
            exit={CONFIG.VARIANTS.exit}
          >
            <div className={CONFIG.STYLES.LEFT_CONTAINER}>{leftControls}</div>
            <div className={CONFIG.STYLES.SPACER}></div>
            <div className={CONFIG.STYLES.RIGHT_CONTAINER}>{rightControls}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
