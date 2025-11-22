import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import Icon from "@/ui/icon";
import { Icon as Badge, Description, Title } from "./elements";
import { ANIMATION } from "./config";
import { ANIMATION_PROPS } from "./utils";
import { useModal } from "../modal/context";
import { Sekeleton } from "@/ui/skeletons/item-nav";
import { useActionSize } from "./hooks";

export default function Item({
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
  const [actionRef, actionSize] = useActionSize();
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
    <>
      <motion.div
        {...ANIMATION_PROPS(expanded, position, showBorder)}
        transition={{
          y: {
            ...ANIMATION.transition,
            delay: expanded ? position * 0.04 : 0,
          },
          scale: {
            ...ANIMATION.transition,
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
            className="center hover:bg-primary rounded-secondary absolute top-2 right-2 z-10 cursor-pointer bg-transparent p-1 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              openModal("SETTINGS_MODAL", "center", {
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
          <Sekeleton />
        ) : (
          <div className="flex h-auto items-center space-x-3">
            <Badge isStackHovered={isStackHovered} icon={link.icon} />
            <div className="flex flex-1 flex-col overflow-hidden">
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
    </>
  );
}
