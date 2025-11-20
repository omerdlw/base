import { ANIMATION_DURATIONS } from '@/config/constants';
import { CN } from '@/lib/utils';
import { ANIMATION } from './config';

export const ANIMATION_PROPS = (expanded, position, showBorder) => {
  const { offsetY: expandedOffsetY } = ANIMATION.expanded;
  const { offsetY: collapsedOffsetY, scale: collapsedScale } =
    ANIMATION.collapsed;

  return {
    className: CN(
      'rounded-primary border-default/15 absolute left-1/2 h-auto w-full -translate-x-1/2 transform-gpu cursor-pointer overflow-hidden border-2 p-3 backdrop-blur-lg transition will-change-transform bg-black/40',
      showBorder && 'border-primary',
    ),
    animate: {
      y: expanded ? position * expandedOffsetY : position * collapsedOffsetY,
      scale: expanded ? 1 : collapsedScale ** position,
      zIndex: ANIMATION.expanded.scale - position,
      opacity: 1,
    },
    exit: {
      transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
      opacity: 0,
      scale: 0.8,
    },
    transition: {
      y: {
        ...ANIMATION.transition,
        delay: expanded ? position * 0.04 : 0,
      },
      scale: {
        ...ANIMATION.transition,
        delay: expanded ? position * 0.02 : 0,
      },
    },
    initial: { opacity: 0, scale: 0.8 },
    layout: true,
  };
};
