"use client";

import { useControlsContext } from "@/contexts/controls-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Controls() {
    const { leftControls, rightControls } = useControlsContext();
    const hasControls = leftControls || rightControls;

    return (
        <div className="fixed left-0 right-0 bottom-[13px] w-full h-auto px-4 pointer-events-none">
            <AnimatePresence>
                {hasControls && (
                    <motion.div
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="w-full h-auto flex items-center justify-between space-x-3"
                    >
                        <div className="w-full flex items-center justify-end space-x-3 pointer-events-auto">
                            {leftControls}
                        </div>
                        <div className="w-[300px] h-auto shrink-0"></div>
                        <div className="w-full flex items-center justify-start space-x-3 pointer-events-auto">
                            {rightControls}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
