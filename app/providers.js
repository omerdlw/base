"use client";

import { NavigationProvider } from "@/modules/nav/context";
import { SettingsProvider } from "@/contexts/settings-context";
import { ModalProvider } from "@/modules/modal/context";
import { ControlsProvider } from "@/modules/controls/context";
import { ToastProvider } from "@/modules/toast/context";
import { ThemeProvider } from "@/contexts/theme-context";
import { RegistryProvider } from "@/modules/registry/context"; // YENİ
import { GlobalListener } from "@/components/listener";
import { GlobalError } from "@/components/error-boundary";

const providers = [
  ThemeProvider,
  RegistryProvider,
  NavigationProvider,
  ControlsProvider,
  SettingsProvider,
  ToastProvider,
  ModalProvider,
];

export const AppProviders = ({ children }) => {
  const wrapped = providers.reduceRight((acc, Provider) => {
    if (Provider === ModalProvider) {
      return (
        <Provider>
          <GlobalListener />
          {acc}
        </Provider>
      );
    }
    return <Provider>{acc}</Provider>;
  }, children);

  return <GlobalError>{wrapped}</GlobalError>;
};
