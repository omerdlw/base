"use client";

import { ROUNDED_CLASSES } from "./constants";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const IS_IMAGE_URL = (url) => {
  return Boolean(url?.startsWith("http"));
};

export const FILTER_OPTIONS = (options, query) => {
  if (!query) return options;
  const lowerQuery = query.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowerQuery)
  );
};

export const THROTTLE = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const CALCULATE_MENU_POSITION = (
  triggerRect,
  menuRect,
  direction,
  menuWidth,
  margin = 8
) => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let transform = "translateY(0)";
  let top;
  let left = triggerRect.left + scrollX;
  const width = menuWidth || triggerRect.width;

  switch (direction) {
    case "top":
      top = triggerRect.bottom + scrollY;
      transform = "translateY(-100%)";
      break;
    case "left":
      left = menuRect
        ? triggerRect.left + scrollX - menuRect.width - margin
        : triggerRect.left + scrollX - width - margin;
      top = triggerRect.top + scrollY;
      break;
    case "right":
      left = triggerRect.right + scrollX + margin;
      top = triggerRect.top + scrollY;
      break;
    case "bottom":
    default:
      top = triggerRect.top + scrollY;
      break;
  }

  return { top, left, width, transform };
};

export const GET_OPTION_ROUNDED_CLASS = (
  index,
  totalCount,
  rounded,
  showSearch
) => {
  const classes = ROUNDED_CLASSES[rounded] || ROUNDED_CLASSES.secondary;

  if (totalCount === 1) {
    return classes.full;
  }

  if (index === 0 && !showSearch) {
    return classes.top;
  }

  if (index === totalCount - 1) {
    return classes.bottom;
  }

  return "";
};

export const GET_ROUNDED_CLASS = (rounded, position = "full") => {
  const classes = ROUNDED_CLASSES[rounded] || ROUNDED_CLASSES.secondary;
  return classes[position] || classes.full;
};

// --- Color Picker Helpers ---
export const HEX_TO_RGB = (hex) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  return { r, g, b };
};

export const RGB_TO_HEX = (r, g, b) => {
  const toHex = (c) =>
    ("0" + Math.max(0, Math.min(255, Math.round(c || 0))).toString(16)).slice(
      -2
    );
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const RGB_TO_HSV = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

export const HSV_TO_RGB = (h, s, v) => {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};
