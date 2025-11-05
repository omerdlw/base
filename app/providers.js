import { NavigationProvider } from "@/contexts/navigation-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { ModalProvider } from "@/contexts/modal-context";
import React from "react";
import { ControlsProvider } from "@/contexts/controls-context";

const providers = [
  NavigationProvider,
  ControlsProvider,
  SettingsProvider,
  ModalProvider,
];

export const AppProviders = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};
