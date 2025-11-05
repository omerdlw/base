"use client";

import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import { NAV_ANIMATION_CONFIG } from "@/config/constants";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Item from "./item";
import { useNavigation } from "@/hooks/use-navigation";

export default function Nav() {
  const {
    activeItemHasAction,
    navigationItems,
    setIsHovered,
    setExpanded,
    activeIndex,
    expanded,
    pathname,
    navigate,
  } = useNavigation();

  const [isStackHovered, setIsStackHovered] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [actionHeight, setActionHeight] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    setContainerHeight(
      NAV_ANIMATION_CONFIG.BASE_CARD_HEIGHT +
        (activeItemHasAction && actionHeight > 0
          ? actionHeight + NAV_ANIMATION_CONFIG.ACTION_GAP
          : 0),
    );
  }, [pathname, actionHeight, activeItemHasAction]);

  useClickOutside(navRef, () => setExpanded(false));

  return (
    <MotionConfig transition={NAV_ANIMATION_CONFIG.transition}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 backdrop-blur-xl z-40 cursor-pointer"
            onClick={() => setExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed w-screen h-screen inset-0 -z-10 dark:dark:bg-linear-to-t dark:from-black dark:via-black/40 dark:to-black/50 bg-linear-to-t from-white via-white/40 to-white/50"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="fixed bottom-4 left-1/2 -translate-x-2/4 w-[300px] mx-auto z-50 select-none"
        id="nav-card-stack"
        ref={navRef}
      >
        <div
          style={{
            transition: "height 300ms ease-in-out",
            height: `${containerHeight}px`,
          }}
          className="relative"
        >
          <AnimatePresence mode="popLayout">
            {navigationItems.map((link, i) => {
              const position =
                (i - activeIndex + navigationItems.length) %
                navigationItems.length;
              const isTop = position === 0;

              return (
                <Item
                  onClick={() =>
                    expanded ? navigate(link.path) : isTop && setExpanded(true)
                  }
                  onActionHeightChange={isTop ? setActionHeight : null}
                  onMouseEnter={() => {
                    if (isTop) {
                      setIsStackHovered(true);
                      pathname !== "/" && setIsHovered(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isTop) {
                      setIsStackHovered(false);
                      pathname !== "/" && setIsHovered(false);
                    }
                  }}
                  expanded={expanded}
                  position={position}
                  key={link.path}
                  isTop={isTop}
                  link={link}
                  isStackHovered={isStackHovered}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
