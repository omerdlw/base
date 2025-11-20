import { NavigationProvider } from '@/modules/nav/context';
import { SettingsProvider } from '@/contexts/settings-context';
import { ModalProvider } from '@/modules/modal/context';
import { ControlsProvider } from '@/modules/controls/context';
import { ToastProvider } from '@/modules/toast/context';

const providers = [
  NavigationProvider,
  ControlsProvider,
  SettingsProvider,
  ToastProvider,
  ModalProvider,
];

export const AppProviders = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};
