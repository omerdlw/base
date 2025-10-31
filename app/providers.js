import { NavigationProvider } from "@/contexts/navigation-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { ModalProvider } from "@/contexts/modal-context";
import React from "react";

const providers = [SettingsProvider, NavigationProvider, ModalProvider];

export const AppProviders = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};
