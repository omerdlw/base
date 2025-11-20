export const CONFIG = {
  Z_INDEX_OFFSET: 100,
  SCALE_OFFSET: 0.05,
  MAX_VISIBLE: 4,
  OFFSET_Y: 10,
  WIDTH: 500,
};

export const ANIMATION = {
  initial: { opacity: 0, y: -50, scale: 0.9 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
  getAnimate: (y, scale) => ({
    opacity: 1,
    scale,
    y,
  }),
  getExit: (y, scale) => ({
    transition: { duration: 0.2 },
    scale: scale * 0.95,
    opacity: 0,
    y: y - 20,
  }),
};
