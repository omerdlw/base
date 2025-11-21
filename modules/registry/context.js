"use client";

import { createContext, useContext, useState, useCallback } from "react";

const RegistryContext = createContext(null);

export function RegistryProvider({ children }) {
  const [registry, setRegistry] = useState({});

  const register = useCallback((key, component) => {
    setRegistry((prev) => ({ ...prev, [key]: component }));
  }, []);

  const unregister = useCallback((key) => {
    setRegistry((prev) => {
      const newRegistry = { ...prev };
      delete newRegistry[key];
      return newRegistry;
    });
  }, []);

  const get = useCallback((key) => registry[key], [registry]);

  return (
    <RegistryContext.Provider value={{ register, unregister, get, registry }}>
      {children}
    </RegistryContext.Provider>
  );
}

export function useModalRegistry() {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error("useModalRegistry must be used within a RegistryProvider");
  }
  return context;
}
