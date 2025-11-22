"use client";

import { useControlsContext } from "@/modules/controls/context";
import { useNavigationContext } from "@/modules/nav/context";
import { useEffect } from "react";

export function usePageConfig({ nav, controls }) {
  const { setDynamicNavItem } = useNavigationContext();
  const { setControls } = useControlsContext();

  useEffect(() => {
    if (nav) {
      setDynamicNavItem(nav);
    }
    return () => setDynamicNavItem(null);
  }, [nav]);

  useEffect(() => {
    if (controls) {
      setControls(controls);
    }
    return () => setControls({ left: null, right: null });
  }, [controls]);
}
