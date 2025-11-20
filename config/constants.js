export const API_ENDPOINTS = {
  PLACEHOLDER: '',
};

export const API_CONFIG = {};

export const ANIMATION_DURATIONS = {
  NORMAL: 300,
  SLOW: 600,
  FAST: 200,
};

export const Z_INDEX = {
  MODAL_BACKDROP: -10,
  BACKGROUND: -10,
  DROPDOWN: 10,
  TOOLTIP: 60,
  MODAL: 50,
};

export const BREAKPOINTS = {
  '2XL': 1536,
  LG: 1024,
  XL: 1280,
  SM: 640,
  MD: 768,
};

export const STORAGE_KEYS = {
  SETTINGS: 'SETTINGS',
  THEME: 'THEME',
};

export const THEMES = {
  DARK: 'dark',
};

export const VALID_THEMES = Object.values(THEMES);

export const DATE_FORMATS = {
  FULL: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  SHORT: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  YEAR_ONLY: {
    year: 'numeric',
  },
};

export const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CREATED: 201,
  OK: 200,
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  URL: /^https?:\/\/.+/,
};
