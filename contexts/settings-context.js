'use client';

import { STORAGE_KEYS } from '@/config/constants';
import { GET_STORAGE_ITEM, SET_STORAGE_ITEM } from '@/lib/utils';
import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useState,
} from 'react';

const SettingsContext = createContext(undefined);

const DEFAULT_SETTINGS = {};

const getStoredSettings = () => {
  const stored = GET_STORAGE_ITEM(STORAGE_KEYS.SETTINGS);
  return stored ? { ...DEFAULT_SETTINGS, ...stored } : DEFAULT_SETTINGS;
};

const saveSettings = (settings) => {
  return SET_STORAGE_ITEM(STORAGE_KEYS.SETTINGS, settings);
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSettings(getStoredSettings());
      setIsInitialized(true);
    }
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  }, []);

  const contextValue = useMemo(
    () => ({
      updateSettings,
      isInitialized,
      resetSettings,
      settings,
    }),
    [updateSettings, resetSettings, isInitialized, settings],
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
