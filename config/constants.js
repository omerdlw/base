export const API_ENDPOINTS = {
    PLACEHOLDER: "https://jsonplaceholder.typicode.com/todos/1",
};

export const API_CONFIG = {};

export const ROUTES = {
    PAGE_1: "/placeholder",
    PAGE_2: "/placeholder2",
    PAGE_3: "/placeholder3",
};

export const NAV_ANIMATION_CONFIG = {
    expanded: {
        offsetY: -80,
        scale: 1,
    },
    collapsed: {
        offsetY: -11,
        scale: 0.9,
    },
    transition: {
        stiffness: 150,
        mass: 0.8,
        damping: 20,
        restDelta: 0.1,
    },
    BASE_CARD_HEIGHT: 75,
    ACTION_GAP: 10,
};

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
    "2XL": 1536,
    LG: 1024,
    XL: 1280,
    SM: 640,
    MD: 768,
};

export const STORAGE_KEYS = {
    SETTINGS: "SETTINGS",
    THEME: "THEME",
};

export const THEMES = {
    SYSTEM: "system",
    LIGHT: "light",
    DARK: "dark",
};

export const VALID_THEMES = Object.values(THEMES);

export const DATE_FORMATS = {
    FULL: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    SHORT: {
        year: "numeric",
        month: "short",
        day: "numeric",
    },
    YEAR_ONLY: {
        year: "numeric",
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
