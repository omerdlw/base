"use client";

// ============================================================================
// STYLES
// ============================================================================

// Hata almamak için ekledik
export const DISABLED_CLASS =
  "opacity-50 cursor-not-allowed pointer-events-none";

export const COMPONENT_STYLES = {
  // Orijinal stil
  base: "center relative cursor-pointer group bg-black/40 border border-default/10 hover:border-primary p-1",
  iconContainer: "center w-auto h-full bg-default/5",
  blur: {
    enabled: "backdrop-blur-xl",
    disabled: "",
  },
  shared: {
    container: "bg-black/40 border border-default/10",
    hover: "hover:bg-black/40",
    focus: "focus-within:border-primary",
    disabled: "opacity-50 cursor-not-allowed",
  },
};

export const ROUNDED_CLASSES = {
  primary: {
    full: "rounded-primary",
    top: "rounded-t-primary",
    bottom: "rounded-b-primary",
  },
  secondary: {
    full: "rounded-secondary",
    top: "rounded-t-secondary",
    bottom: "rounded-b-secondary",
  },
  tertiary: {
    full: "rounded-tertiary",
    top: "rounded-t-tertiary",
    bottom: "rounded-b-tertiary",
  },
  quaternary: {
    full: "rounded-quaternary",
    top: "rounded-t-quaternary",
    bottom: "rounded-b-quaternary",
  },
};

export const TOOLTIP_POSITION_CLASSES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

// ============================================================================
// SIZES
// ============================================================================

export const SIZE_CONFIGURATIONS = {
  sm: {
    button: { iconOnly: "size-[45px]", withText: "h-[45px]" },
    icon: "w-[35px]",
    text: "text-sm",
  },
  md: {
    button: { iconOnly: "size-[55px]", withText: "h-[55px]" },
    icon: "w-[45px]",
    text: "text-base",
  },
  lg: {
    button: { iconOnly: "size-[65px]", withText: "h-[65px]" },
    icon: "w-[55px]",
    text: "text-lg",
  },
};

export const SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS = {
  sm: {
    button: { withText: "h-[38px]" },
    icon: "w-[28px]",
    text: "text-xs",
  },
  md: {
    button: { withText: "h-[46px]" },
    icon: "w-[36px]",
    text: "text-base",
  },
  lg: {
    button: { withText: "h-[54px]" },
    icon: "w-[44px]",
    text: "text-base",
  },
};

export const TOGGLE_SIZE_CLASSES = {
  sm: {
    knob: "w-5 h-5 top-1 left-1",
    translate: "translate-x-5",
    container: "w-12 h-7",
  },
  md: {
    knob: "w-6 h-6 top-1 left-1",
    translate: "translate-x-6",
    container: "w-14 h-8",
  },
  lg: {
    knob: "w-7 h-7 top-1 left-1",
    translate: "translate-x-7",
    container: "w-16 h-9",
  },
};

// ============================================================================
// CONFIGURATION
// ============================================================================

export const CONFIG = {
  menu: {
    maxHeight: "max-h-[200px]",
    searchThreshold: 8,
  },
  fallback: {
    image: "/placeholder.svg",
  },
  imageRetry: {
    maxRetries: 3,
    backoffMultiplier: 1000,
  },
};
