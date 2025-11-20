import {
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { useNavigationContext } from '@/modules/nav/context';
import { usePathname, useRouter } from 'next/navigation';
import { ITEMS } from '@/modules/nav/config';

export const useNavigation = () => {
  const { dynamicNavItem, expanded, setExpanded } = useNavigationContext();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = useCallback(
    (href) => {
      router.push(href);
      setExpanded(false);
    },
    [router, setExpanded],
  );

  const navigationItems = useMemo(() => {
    const items = Object.values(ITEMS);
    if (!dynamicNavItem) {
      return items;
    }
    const index = items.findIndex((item) => item.path === dynamicNavItem.path);
    if (index !== -1) {
      return [
        ...items.slice(0, index),
        dynamicNavItem,
        ...items.slice(index + 1),
      ];
    } else {
      return [dynamicNavItem, ...items];
    }
  }, [dynamicNavItem]);

  useEffect(() => {
    navigationItems.forEach((link) => router.prefetch(link.path));
  }, [router, navigationItems]);

  useEffect(() => {
    setExpanded(false);
  }, [pathname, setExpanded]);

  const activeIndex = useMemo(() => {
    const currentPath = pathname;
    const index = navigationItems.findIndex(
      (item) => item.path === currentPath,
    );
    return Math.max(0, index);
  }, [pathname, navigationItems]);

  const activeItem = navigationItems[activeIndex];

  const displayItems = useMemo(() => {
    if (pathname === '/' || expanded || isHovered) {
      return navigationItems;
    }
    return activeItem ? [activeItem] : [];
  }, [pathname, expanded, isHovered, navigationItems, activeItem]);

  const activeItemHasAction = useMemo(() => !!activeItem?.action, [activeItem]);

  return {
    navigationItems: displayItems,
    navigate: handleNavigate,
    activeItemHasAction,
    setIsHovered,
    setExpanded,
    activeIndex,
    expanded,
    pathname,
  };
};

export function useActionSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref.current]);

  return [ref, size];
}
