import { useNavigationContext } from "@/contexts/navigation-context";
import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_LINKS } from "@/config/constants";
import { createNavItem } from "./use-nav-item";

const SKELETON_ITEM = createNavItem("skeleton");

const baseLinks = NAVIGATION_LINKS.reduce((acc, link) => {
  acc[link.name] = link;
  return acc;
}, {});

export const useNavigation = () => {
  const { dynamicNavItem, expanded, setExpanded } = useNavigationContext();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const showSkeleton = dynamicNavItem;

  const handleNavigate = useCallback(
    (href) => {
      router.push(href);
      setExpanded(false);
    },
    [router, setExpanded]
  );

  useEffect(() => {
    NAVIGATION_LINKS.forEach((link) => router.prefetch(link.href));
  }, [router]);

  useEffect(() => {
    setExpanded(false);
  }, [pathname, setExpanded]);

  const navigationItems = useMemo(() => {
    const { home } = baseLinks;

    if (showSkeleton) {
      return [SKELETON_ITEM, home].filter(Boolean);
    }

    if (dynamicNavItem) {
      return;
    }

    return NAVIGATION_LINKS;
  }, [dynamicNavItem, showSkeleton]);

  const activeIndex = useMemo(() => {
    if (showSkeleton) return 0;

    const currentPath = pathname;
    const index = navigationItems.findIndex(
      (item) => item.href === currentPath
    );
    return Math.max(0, index);
  }, [pathname, navigationItems, showSkeleton]);

  const activeItem = navigationItems[activeIndex];

  const displayItems = useMemo(() => {
    if (pathname === "/" || expanded || isHovered) {
      return navigationItems;
    }
    return activeItem ? [activeItem] : [];
  }, [pathname, expanded, isHovered, navigationItems, activeItem]);

  const activeItemHasAction = useMemo(() => ["/"].includes(activeItem?.href));

  return {
    navigationItems: displayItems,
    navigate: handleNavigate,
    activeItemHasAction,
    setIsHovered,
    showSkeleton,
    setExpanded,
    activeIndex,
    expanded,
    pathname,
  };
};
