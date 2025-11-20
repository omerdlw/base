'use client';

import { ROUNDED_CLASSES } from './constants';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if a string is an image URL
 * @param {string} url - URL to check
 * @returns {boolean} True if URL starts with http
 */
export const IS_IMAGE_URL = (url) => {
  return Boolean(url?.startsWith('http'));
};

/**
 * Filter options based on search query
 * @param {Array} options - Array of option objects with label property
 * @param {string} query - Search query string
 * @returns {Array} Filtered options
 */
export const FILTER_OPTIONS = (options, query) => {
  if (!query) return options;
  const lowerQuery = query.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowerQuery),
  );
};

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
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

/**
 * Calculate the position of the menu relative to the trigger
 * @param {DOMRect} triggerRect - Bounding rectangle of the trigger element
 * @param {DOMRect} menuRect - Bounding rectangle of the menu element
 * @param {string} direction - Direction to open the menu (top, bottom, left, right)
 * @param {number} menuWidth - Custom width for the menu
 * @param {number} margin - Margin between trigger and menu
 * @returns {Object} Position object with top, left, and width
 */
export const CALCULATE_MENU_POSITION = (
  triggerRect,
  menuRect,
  direction,
  menuWidth,
  margin = 8,
) => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let top;
  let left = triggerRect.left + scrollX;
  const width = menuWidth || triggerRect.width;

  switch (direction) {
    case 'top':
      top = menuRect
        ? triggerRect.bottom + scrollY - menuRect.height
        : triggerRect.bottom + scrollY - 200; // Fallback height
      break;
    case 'left':
      left = menuRect
        ? triggerRect.left + scrollX - menuRect.width - margin
        : triggerRect.left + scrollX - width - margin;
      top = triggerRect.top + scrollY;
      break;
    case 'right':
      left = triggerRect.right + scrollX + margin;
      top = triggerRect.top + scrollY;
      break;
    case 'bottom':
    default:
      top = triggerRect.bottom + scrollY + margin;
      break;
  }

  return { top, left, width };
};

/**
 * Get the rounded class for a selectbox option based on its position
 * @param {number} index - Index of the option
 * @param {number} totalCount - Total number of options
 * @param {string} rounded - Rounded style name
 * @param {boolean} showSearch - Whether search is shown
 * @returns {string} Tailwind class for rounded corners
 */
export const GET_OPTION_ROUNDED_CLASS = (
  index,
  totalCount,
  rounded,
  showSearch,
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

  return '';
};

/**
 * Get a specific rounded class from the configuration
 * @param {string} rounded - Rounded style name
 * @param {string} position - Position (full, top, bottom)
 * @returns {string} Tailwind class
 */
export const GET_ROUNDED_CLASS = (rounded, position = 'full') => {
  const classes = ROUNDED_CLASSES[rounded] || ROUNDED_CLASSES.secondary;
  return classes[position] || classes.full;
};
