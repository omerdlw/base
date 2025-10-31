"use client";

import { createContext, useContext, useState, useMemo } from "react";

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [dynamicNavItem, setDynamicNavItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const value = useMemo(
    () => ({
      setDynamicNavItem,
      dynamicNavItem,
      setSearchQuery,
      setExpanded,
      searchQuery,
      expanded,
    }),
    [dynamicNavItem, expanded, searchQuery],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider",
    );
  }
  return context;
}
