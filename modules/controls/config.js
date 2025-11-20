export const CONFIG = {
  ANIMATION: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  VARIANTS: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  STYLES: {
    CONTAINER:
      'pointer-events-none fixed right-0 bottom-[13px] left-0 h-auto w-full px-4',
    INNER_CONTAINER:
      'flex h-auto w-full items-center justify-between space-x-3',
    LEFT_CONTAINER:
      'pointer-events-auto flex w-full items-center justify-end space-x-3',
    RIGHT_CONTAINER:
      'pointer-events-auto flex w-full items-center justify-start space-x-3',
    SPACER: 'h-auto w-[300px] shrink-0',
  },
};
