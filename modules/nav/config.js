import TestAction from '@/modules/nav/actions/test-action';

export const ANIMATION = {
  expanded: {
    offsetY: -85,
    scale: 1,
  },
  collapsed: {
    offsetY: -12,
    scale: 0.9,
  },
  transition: {
    stiffness: 150,
    restDelta: 0.1,
    damping: 20,
    mass: 0.8,
  },
  BASE_CARD_HEIGHT: 75,
  ACTION_GAP: 10,
};

const ROUTES = {
  PAGE_2: '/placeholder2',
  PAGE_3: '/placeholder3',
  PAGE_1: '/placeholder',
};

export const ITEMS = {
  placeholder: {
    icon: 'solar:test-tube-minimalistic-bold',
    description: 'Page 1 description',
    path: ROUTES.PAGE_1,
    action: TestAction,
    title: 'Page 1',
    name: 'Page 1',
  },
  placeholder2: {
    icon: 'solar:test-tube-minimalistic-bold',
    description: 'Page 2 description',
    path: ROUTES.PAGE_2,
    title: 'Page 2',
    name: 'Page 2',
  },
  placeholder3: {
    icon: 'solar:test-tube-minimalistic-bold',
    description: 'Page 3 description',
    path: ROUTES.PAGE_3,
    title: 'Page 3',
    name: 'Page 3',
  },
};
