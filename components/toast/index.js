"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TOAST_CONFIG, Z_INDEX } from "@/config/constants";
import { useToastContext } from "@/contexts/toast-context";
import Item from "./item";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  const visibleToasts = toasts.slice(0, TOAST_CONFIG.MAX_VISIBLE);

  return (
    <div
      className="fixed top-10 left-2/4 -translate-x-2/4"
      style={{
        zIndex: Z_INDEX.MODAL + 100,
        minWidth: `${TOAST_CONFIG.WIDTH}px`,
      }}
    >
      <AnimatePresence>
        {visibleToasts.map((toast, index) => {
          const total = visibleToasts.length;
          const y = index * TOAST_CONFIG.OFFSET_Y;
          const scale = 1 - index * TOAST_CONFIG.SCALE_OFFSET;
          const zIndex = 100 + (total - 1 - index);

          return (
            <motion.div
              key={toast.id}
              className="absolute top-0 left-0 w-full"
              style={{
                zIndex: zIndex,
              }}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: y,
                scale: scale,
              }}
              exit={{
                opacity: 0,
                y: y - 20,
                scale: scale * 0.95,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Item toast={toast} onClose={() => removeToast(toast.id)} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
