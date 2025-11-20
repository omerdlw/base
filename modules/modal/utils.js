import { ANIMATION_DURATIONS } from "@/config/constants";
import { ANIMATION_CONFIGS, MODAL_POSITIONS } from "./config";

const springTransition = ANIMATION_CONFIGS.SPRING;
const baseExitTransition = { duration: ANIMATION_DURATIONS.FAST / 1000 };

export const getModalVariants = (position) => {
  const variants = {
    [MODAL_POSITIONS.CENTER]: {
      exit: {
        y: "50px",
        scale: 0.95,
        opacity: 0,
        transition: baseExitTransition,
      },
      visible: { y: 0, scale: 1, opacity: 1, transition: springTransition },
      hidden: { y: "-50px", scale: 0.95, opacity: 0 },
    },
    [MODAL_POSITIONS.TOP]: {
      exit: {
        y: "-50px",
        scale: 0.95,
        opacity: 0,
        transition: baseExitTransition,
      },
      visible: { y: 0, scale: 1, opacity: 1, transition: springTransition },
      hidden: { y: "-50px", scale: 0.95, opacity: 0 },
    },
    [MODAL_POSITIONS.LEFT]: {
      exit: { x: "-100%", opacity: 0, transition: baseExitTransition },
      visible: { x: 0, opacity: 1, transition: springTransition },
      hidden: { x: "-100%", opacity: 0 },
    },
    [MODAL_POSITIONS.RIGHT]: {
      exit: { x: "100%", opacity: 0, transition: baseExitTransition },
      visible: { x: 0, opacity: 1, transition: springTransition },
      hidden: { x: "100%", opacity: 0 },
    },
  };

  return variants[position] || variants[MODAL_POSITIONS.CENTER];
};

export const getTitleVariants = (position) => {
  if (position === MODAL_POSITIONS.LEFT || position === MODAL_POSITIONS.RIGHT) {
    const xOffset = position === MODAL_POSITIONS.LEFT ? "-100%" : "100%";
    return {
      exit: { x: xOffset, opacity: 0, transition: baseExitTransition },
      visible: { x: 0, opacity: 1, transition: springTransition },
      hidden: { x: xOffset, opacity: 0 },
    };
  }

  return {
    exit: {
      y: "-50px",
      scale: 0.95,
      opacity: 0,
      transition: baseExitTransition,
    },
    visible: { y: 0, scale: 1, opacity: 1, transition: springTransition },
    hidden: { y: "-50px", scale: 0.95, opacity: 0 },
  };
};

export const POSITION_CLASSES = {
  [MODAL_POSITIONS.CENTER]: "items-center justify-center",
  [MODAL_POSITIONS.BOTTOM]: "items-end justify-center",
  [MODAL_POSITIONS.LEFT]: "items-start justify-start",
  [MODAL_POSITIONS.TOP]: "items-start justify-center",
  [MODAL_POSITIONS.RIGHT]: "items-start justify-end",
};

export const BACKDROP_VARIANTS = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
