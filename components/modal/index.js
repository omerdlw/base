"use client";

import { Z_INDEX, ANIMATION_DURATIONS } from "@/config/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/contexts/modal-context";
import { MODAL_COMPONENTS } from "./modals";
import classNames from "classnames";
import { useEffect } from "react";

const positionClasses = {
  center: "items-center justify-center",
  bottom: "items-end justify-center",
  left: "items-start justify-start",
  top: "items-start justify-center",
  right: "items-start justify-end",
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

const modalVariantsCenter = {
  exit: {
    y: "50px",
    scale: 0.95,
    opacity: 0,
    transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
  },
  visible: { y: 0, scale: 1, opacity: 1, transition: springTransition },
  hidden: { y: "-50px", scale: 0.95, opacity: 0 },
};

const modalVariantsLeft = {
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
  },
  visible: { x: 0, opacity: 1, transition: springTransition },
  hidden: { x: "-100%", opacity: 0 },
};

const modalVariantsRight = {
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
  },
  visible: { x: 0, opacity: 1, transition: springTransition },
  hidden: { x: "100%", opacity: 0 },
};

const getModalVariants = (position) => {
  switch (position) {
    case "left":
      return modalVariantsLeft;
    case "right":
      return modalVariantsRight;
    default:
      return modalVariantsCenter;
  }
};

const Modal = () => {
  const { isOpen, closeModal, modalType, props: data, position } = useModal();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (modalType && !MODAL_COMPONENTS[modalType]) {
    console.error(
      `Modal type "${modalType}" is not defined in MODAL_COMPONENTS.`,
    );
    return null;
  }

  const SpecificModalComponent = MODAL_COMPONENTS[modalType];
  const isSideModal = position === "left" || position === "right";

  return (
    <AnimatePresence mode="wait">
      {isOpen && modalType && (
        <div
          className={classNames(
            "fixed inset-0 flex",
            positionClasses[position],
            {
              "p-4": !isSideModal,
            },
          )}
          style={{ zIndex: Z_INDEX.MODAL }}
        >
          <motion.div
            className="fixed inset-0 bg-white/60 dark:bg-black/40"
            style={{ zIndex: Z_INDEX.MODAL_BACKDROP }}
            variants={backdropVariants}
            onClick={closeModal}
            animate="visible"
            initial="hidden"
            exit="hidden"
          />
          <motion.div
            className={classNames(
              "relative bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/15 dark:border-white/15",
              {
                "border-y-0 border-l-0": position === "left",
                "border-y-0 border-r-0": position === "right",
                "rounded-primary": !isSideModal,
                "h-screen": isSideModal,
              },
            )}
            variants={getModalVariants(position)}
            style={{ zIndex: Z_INDEX.DROPDOWN }}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <SpecificModalComponent close={closeModal} data={data} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
