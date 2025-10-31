import { NAV_ANIMATION_CONFIG, ANIMATION_DURATIONS } from "@/config/constants";
import { useMemo, useState, useEffect, useLayoutEffect } from "react";
import { Description, Title, Icon as Badge } from "./elements";
import { useComponentSize } from "@/hooks/use-component-size";
import { NavCardSkeleton } from "../shared/skeletons";
import { useModal } from "@/contexts/modal-context";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Icon from "../icon";

export default function Card({
  onActionHeightChange,
  isStackHovered,
  onMouseEnter,
  onMouseLeave,
  position,
  expanded,
  onClick,
  isTop,
  link,
}) {
  const [isIndividualHovered, setIsIndividualHovered] = useState(false);
  const { offsetY: expandedOffsetY } = NAV_ANIMATION_CONFIG.expanded;
  const { offsetY: collapsedOffsetY, scale: collapsedScale } =
    NAV_ANIMATION_CONFIG.collapsed;
  const [actionRef, actionSize] = useComponentSize();
  const [isHovered, setIsHovered] = useState(false);
  const { openModal } = useModal();
  const pathname = usePathname();

  const ActionComponent = useMemo(() => {
    if (pathname === "/" && link.name === "home") {
      return null;
    }

    return null;
  }, [pathname, link, expanded]);

  useLayoutEffect(() => {
    if (isTop && onActionHeightChange) {
      if (ActionComponent && actionSize.height > 0) {
        requestAnimationFrame(() => onActionHeightChange(actionSize.height));
      } else {
        requestAnimationFrame(() => onActionHeightChange(0));
      }
    }
  }, [isTop, ActionComponent, actionSize.height, onActionHeightChange]);

  if (link.skeleton) {
    return (
      <motion.div
        exit={{
          transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
          opacity: 0,
          scale: 0.8,
        }}
        className="absolute left-1/2 -translate-x-1/2 w-full"
        animate={{
          zIndex: NAV_ANIMATION_CONFIG.expanded.scale - position,
          scale: Math.pow(collapsedScale, position),
          y: position * collapsedOffsetY,
          opacity: 1,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <NavCardSkeleton />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 w-full h-auto cursor-pointer rounded-primary bg-white/80 dark:bg-black/40 backdrop-blur-lg border-2 p-3 transition transform-gpu will-change-transform ${
        expanded
          ? isIndividualHovered
            ? "border-primary"
            : "border-base/10"
          : isStackHovered
            ? "border-primary"
            : "border-base/10"
      }`}
      animate={{
        y: expanded ? position * expandedOffsetY : position * collapsedOffsetY,
        scale: expanded ? 1 : Math.pow(collapsedScale, position),
        zIndex: NAV_ANIMATION_CONFIG.expanded.scale - position,
        opacity: 1,
      }}
      exit={{
        transition: { duration: ANIMATION_DURATIONS.FAST / 1000 },
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        y: {
          ...NAV_ANIMATION_CONFIG.transition,
          delay: expanded ? position * 0.04 : 0,
        },
        scale: {
          ...NAV_ANIMATION_CONFIG.transition,
          delay: expanded ? position * 0.02 : 0,
        },
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      onMouseEnter={() => {
        setIsIndividualHovered(true);
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsIndividualHovered(false);
        setIsHovered(false);
        onMouseLeave?.();
      }}
      onClick={onClick}
      layout
    >
      {isTop && (
        <button
          className="absolute top-2/4 -translate-y-2/4 right-3 center cursor-pointer bg-transparent hover:bg-primary hover:text-white p-2 rounded-secondary"
          onClick={() => openModal("SETTINGS_MODAL")}
        >
          <Icon icon={"solar:settings-bold"} size={20} />
        </button>
      )}
      <div className="flex items-center h-auto space-x-3">
        <Badge icon={link.icon} />
        <div className="flex-1 flex flex-col -space-y-0.5 overflow-hidden">
          <Title text={link.name} />
          <Description
            text={
              isHovered && !expanded
                ? "click to see the pages"
                : link.description
            }
          />
        </div>
      </div>
      {ActionComponent && <div ref={actionRef}>{ActionComponent}</div>}
    </motion.div>
  );
}
