"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigation } from "@/modules/nav/hooks";
import { ANIMATION } from "./config";
import Item from "./item";
import { RegistryInjector } from "../registry/injector";
import SettingsModal from "@/components/modals/settings";

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
      ANIMATION.BASE_CARD_HEIGHT +
        (activeItemHasAction && actionHeight > 0
          ? actionHeight + ANIMATION.ACTION_GAP
          : 0)
    );
  }, [pathname, actionHeight, activeItemHasAction]);

  useEffect(() => {
    if (expanded) {
      setIsStackHovered(false);
    }
  }, [expanded]);

  useClickOutside(navRef, () => setExpanded(false));

  const registryComponents = useMemo(
    () => ({ SETTINGS_MODAL: SettingsModal }),
    []
  );

  return (
    <MotionConfig transition={ANIMATION.transition}>
      <RegistryInjector components={registryComponents} />
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40 cursor-pointer backdrop-blur-xl"
            onClick={() => setExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 -z-10 h-screen w-screen bg-linear-to-t from-black via-black/40 to-black/20"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="fixed bottom-4 left-1/2 z-50 mx-auto w-auto min-w-[300px] -translate-x-2/4 select-none"
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
                  totalItems={navigationItems.length} // YENİ PROP
                  isStackHovered={isStackHovered}
                  expanded={expanded}
                  position={position}
                  key={link.path}
                  isTop={isTop}
                  link={link}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
