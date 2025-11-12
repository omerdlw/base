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

export default function Title({
    title,
    close,
    description,
    position = "center",
}) {
    return (
        <motion.div
            className="fixed top-0 flex items-center justify-between bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-black/15 dark:border-white/15 rounded-b-primary h-auto p-4 min-w-md max-w-7xl"
            style={{ zIndex: Z_INDEX.DROPDOWN }}
            variants={getTitleVariants(position)}
            animate="visible"
            initial="hidden"
            exit="exit"
        >
            <div className="flex flex-col items-start h-full">
                <h2 className="font-semibold">{title}</h2>
                {description && (
                    <p className="text-xs opacity-75 line-clamp-1">
                        {description}
                    </p>
                )}
            </div>
            <div
                className="rounded-primary size-10 center bg-base/10 cursor-pointer"
                onClick={() => close()}
            >
                <Icon icon="solar:close-circle-bold" />
            </div>
        </motion.div>
    );
}
