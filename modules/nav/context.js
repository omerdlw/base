'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [dynamicNavItem, setDynamicNavItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const value = useMemo(
    () => ({
      setDynamicNavItem,
      setSearchQuery,
      dynamicNavItem,
      setExpanded,
      searchQuery,
      expanded,
    }),
    [dynamicNavItem, expanded, searchQuery, setDynamicNavItem],
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
      'useNavigationContext must be used within a NavigationProvider',
    );
  }
  return context;
}
