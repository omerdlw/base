"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { THEME_CONFIG } from "@/config/theme";
import { GET_STORAGE_ITEM, SET_STORAGE_ITEM } from "@/lib/utils";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    primary: THEME_CONFIG.default.primary,
    radius: THEME_CONFIG.default.radius,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Başlangıçta LocalStorage oku
  useEffect(() => {
    const storedTheme = GET_STORAGE_ITEM("THEME_SETTINGS");
    if (storedTheme) {
      setTheme((prev) => ({ ...prev, ...storedTheme }));
    }
    setIsInitialized(true);
  }, []);

  // 2. CSS Değişkenlerini ANLIK güncelle (Hızlı)
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    const radiusValues = THEME_CONFIG.radiusPresets[theme.radius];

    root.style.setProperty("--color-primary", theme.primary);

    Object.entries(THEME_CONFIG.fixed).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    if (radiusValues) {
      Object.entries(radiusValues).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
    }
  }, [theme, isInitialized]);

  // 3. LocalStorage'ı GECİKMELİ kaydet (Debounce - Performans için kritik)
  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = setTimeout(() => {
      SET_STORAGE_ITEM("THEME_SETTINGS", theme);
    }, 500); // 500ms bekleyip kaydeder

    return () => clearTimeout(timeoutId);
  }, [theme, isInitialized]);

  const setPrimaryColor = useCallback((color) => {
    setTheme((prev) => ({ ...prev, primary: color }));
  }, []);

  const setRadiusPreset = useCallback((presetName) => {
    setTheme((prev) => ({ ...prev, radius: presetName }));
  }, []);

  const value = {
    theme,
    setPrimaryColor,
    setRadiusPreset,
    presets: THEME_CONFIG,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={{ visibility: isInitialized ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
