"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ControlsContext = createContext(undefined);

export function ControlsProvider({ children }) {
  const [controls, setControls] = useState({ left: null, right: null });

  const value = useMemo(
    () => ({
      rightControls: controls.right,
      leftControls: controls.left,
      setControls,
    }),
    [controls]
  );

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
}

export function useControlsContext() {
  const context = useContext(ControlsContext);
  if (context === undefined) {
    throw new Error(
      "useControlsContext must be used within a ControlsProvider"
    );
  }
  return context;
}
