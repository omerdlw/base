"use client";

import { useEffect } from "react";
import { useModalRegistry } from "./context";

export const RegistryInjector = ({ components }) => {
  const { register, unregister } = useModalRegistry();

  useEffect(() => {
    Object.entries(components).forEach(([key, component]) => {
      register(key, component);
    });

    return () => {
      Object.keys(components).forEach((key) => {
        unregister(key);
      });
    };
  }, [components, register, unregister]);

  return null;
};
