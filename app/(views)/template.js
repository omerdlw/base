"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
    return (
        <motion.div
            transition={{ ease: "easeInOut", duration: 0.5 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 1 }}
        >
            {children}
        </motion.div>
    );
}
