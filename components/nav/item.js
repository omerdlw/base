import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  ANIMATION_DURATIONS,
  MODAL_IDS,
  NAV_ANIMATION_CONFIG,
} from "@/config/constants";
import { useModal } from "@/contexts/modal-context";
import { useComponentSize } from "@/hooks/use-component-size";
import { CN } from "@/lib/utils";
import Icon from "../icon";
import { Nav_ItemSkeleton } from "../shared/skeletons";
import { Icon as Badge, Description, Title } from "./elements";

export default function Item({
  onActionHeightChange,
  isStackHovered,
  onMouseEnter,
  onMouseLeave,
  totalItems,
  position,
  expanded,
  onClick,
  isTop,
  link,
}) {
  const { offsetY: expandedOffsetY } = NAV_ANIMATION_CONFIG.expanded;
  const { offsetY: collapsedOffsetY, scale: collapsedScale } =
    NAV_ANIMATION_CONFIG.collapsed;
  const [actionRef, actionSize] = useComponentSize();
  const [isHovered, setIsHovered] = useState(false);
  const { openModal } = useModal();
  const pathname = usePathname();

  const ActionComponent = useMemo(() => {
    const Component = link.action;
    if (Component && pathname === link.path) {
      return <Component placeholder="search" />;
    }
    return null;
  }, [link, pathname]);

  useLayoutEffect(() => {
    if (isTop && onActionHeightChange) {
      if (ActionComponent && actionSize.height > 0) {
        requestAnimationFrame(() => onActionHeightChange(actionSize.height));
      } else {
        requestAnimationFrame(() => onActionHeightChange(0));
      }
    }
  }, [isTop, ActionComponent, actionSize.height, onActionHeightChange]);

  const showBorder = expanded ? isHovered : isHovered || isStackHovered;

  return (
    <motion.div
      className={CN(
        "absolute left-1/2 -translate-x-1/2 w-full h-auto overflow-hidden rounded-primary border-2 border-base/15 cursor-pointer bg-white/60 dark:bg-black/40 backdrop-blur-lg p-3 transition transform-gpu will-change-transform",
        showBorder && "border-primary"
      )}
      animate={{
        y: expanded ? position * expandedOffsetY : position * collapsedOffsetY,
        scale: expanded ? 1 : collapsedScale ** position,
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
        setIsHovered(true);
        if (!expanded) onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!expanded) onMouseLeave?.();
      }}
      onClick={onClick}
      layout
    >
      {isTop && (
        <button
          className="absolute top-2 right-2 center cursor-pointer bg-transparent hover:bg-primary hover:text-white p-1 rounded-secondary z-10"
          onClick={(event) => {
            event.stopPropagation();
            openModal(MODAL_IDS.SETTINGS, "center", {
              header: {
                title: "Settings",
                description: "Configure your preferences",
              },
            });
          }}
        >
          <Icon icon={"solar:settings-bold"} size={16} />
        </button>
      )}
      {link.isLoading && isTop ? (
        <Nav_ItemSkeleton />
      ) : (
        <div className="flex items-center h-auto space-x-3">
          <Badge isStackHovered={isStackHovered} icon={link.icon} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Title text={link.title || link.name} />
            <Description
              text={
                isHovered && !expanded
                  ? "click to see the pages"
                  : link.description
              }
            />
          </div>
        </div>
      )}
      {ActionComponent && (
        <div ref={actionRef} onClick={(e) => e.stopPropagation()}>
          {ActionComponent}
        </div>
      )}
    </motion.div>
  );
}
