import SETTINGS from './modals/settings';

export const MODAL_IDS = {
  SETTINGS: 'SETTINGS_MODAL',
};

export const MODAL_POSITIONS = {
  CENTER: 'center',
  BOTTOM: 'bottom',
  RIGHT: 'right',
  LEFT: 'left',
  TOP: 'top',
};

export const ANIMATION_CONFIGS = {
  SPRING: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
};

export const MODAL_COMPONENTS = {
  [MODAL_IDS.SETTINGS]: SETTINGS,
};
