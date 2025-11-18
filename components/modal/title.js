"use client";

import { motion } from "framer-motion";
import { ANIMATION_DURATIONS, Z_INDEX } from "@/config/constants";
import Icon from "../icon";

const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

const getTitleVariants = (position) => {
  const baseExitTransition = { duration: ANIMATION_DURATIONS.FAST / 1000 };

  switch (position) {
    case "left":
    case "right":
      return {
        exit: {
          x: position === "left" ? "-100%" : "100%",
          opacity: 0,
          transition: baseExitTransition,
        },
        visible: { x: 0, opacity: 1, transition: springTransition },
        hidden: {
          x: position === "left" ? "-100%" : "100%",
          opacity: 0,
        },
      };
    case "top":
      return {
        exit: {
          y: "-50px",
          scale: 0.95,
          opacity: 0,
          transition: baseExitTransition,
        },
        visible: {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: springTransition,
        },
        hidden: { y: "-50px", scale: 0.95, opacity: 0 },
      };
    default: // center, bottom
      return {
        exit: {
          y: "-50px",
          scale: 0.95,
          opacity: 0,
          transition: baseExitTransition,
        },
        visible: {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: springTransition,
        },
        hidden: { y: "-50px", scale: 0.95, opacity: 0 },
      };
  }
};

export default function Title({ title, close, description, position }) {
  if (position) {
    return (
      <motion.div
        className="fixed top-0 flex items-center justify-between space-x-6 bg-white/60 dark:bg-black/40 border border-black/15 dark:border-white/15 rounded-b-secondary h-auto p-4 min-w-md max-w-7xl"
        style={{ zIndex: Z_INDEX.DROPDOWN }}
        variants={getTitleVariants(position)}
        animate="visible"
        initial="hidden"
        exit="exit"
      >
        <div className="flex flex-col items-start h-full">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm opacity-75 line-clamp-1">{description}</p>
          )}
        </div>
        <div
          className="rounded-tertiary size-10 center bg-base/10 cursor-pointer border border-transparent hover:bg-transparent hover:border-base/15 transition"
          onClick={() => close()}
        >
          <Icon icon="ci:close-md" />
        </div>
      </motion.div>
    );
  } else {
    return (
      <div className="w-full flex items-center justify-between space-x-6 bg-white/60 dark:bg-black/40 border-b border-black/15 dark:border-white/15 p-4">
        <div className="flex flex-col items-start w-full h-full">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm opacity-75 line-clamp-1">{description}</p>
          )}
        </div>
        <div
          className="rounded-tertiary shrink-0 size-10 center bg-base/10 cursor-pointer border border-transparent hover:bg-transparent hover:border-base/15 transition"
          onClick={() => close()}
        >
          <Icon icon="ci:close-md" />
        </div>
      </div>
    );
  }
}
