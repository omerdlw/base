'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { MODAL_COMPONENTS, MODAL_POSITIONS } from '@/modules/modal/config';
import Title from '@/modules/modal/title';
import { Z_INDEX } from '@/config/constants';
import { useModal } from '@/modules/modal/context';
import { BACKDROP_VARIANTS, getModalVariants, POSITION_CLASSES } from './utils';
import { CN } from '@/lib/utils';

const Modal = () => {
  const {
    isOpen,
    closeModal,
    modalType,
    props: data,
    position,
    title,
    description,
  } = useModal();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  if (modalType && !MODAL_COMPONENTS[modalType]) {
    console.error(
      `Modal type "${modalType}" is not defined in MODAL_COMPONENTS.`,
    );
    return null;
  }

  const SpecificModalComponent = MODAL_COMPONENTS[modalType];
  const isSideModal =
    position === MODAL_POSITIONS.LEFT || position === MODAL_POSITIONS.RIGHT;

  return (
    <AnimatePresence mode='wait'>
      {isOpen && modalType && (
        <div
          className={CN(
            'fixed inset-0 flex flex-col',
            POSITION_CLASSES[position],
            !isSideModal && 'p-4',
          )}
          style={{ zIndex: Z_INDEX.MODAL }}
        >
          <motion.div
            className='fixed inset-0 backdrop-blur-3xl'
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
            variants={BACKDROP_VARIANTS}
            onClick={closeModal}
            animate='visible'
            initial='hidden'
            exit='hidden'
          />
          <motion.div
            className={CN(
              'border-default/10 relative flex flex-col border bg-black/40',
              position === MODAL_POSITIONS.LEFT && 'border-y-0 border-l-0',
              position === MODAL_POSITIONS.RIGHT && 'border-y-0 border-r-0',
              !isSideModal ? 'rounded-primary' : 'h-screen',
            )}
            variants={getModalVariants(position)}
            style={{ zIndex: Z_INDEX.DROPDOWN }}
            animate='visible'
            initial='hidden'
            exit='exit'
          >
            <SpecificModalComponent
              header={{ title, description }}
              close={closeModal}
              data={data}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
