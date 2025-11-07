"use client";

import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";
import { Selectbox } from "@/components/shared/elements";

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const THEME_ICONS = {
  light: "solar:sun-2-bold",
  dark: "solar:moon-bold",
  system: "solar:screencast-2-bold",
};

export default function SettingsModal() {
  const { theme, setTheme } = useSettings();
  const toast = useToast();

  const options = useMemo(() => {
    const currentThemeOption = THEME_OPTIONS.find((opt) => opt.value === theme);
    const otherOptions = THEME_OPTIONS.filter((opt) => opt.value !== theme);
    return currentThemeOption
      ? [currentThemeOption, ...otherOptions]
      : THEME_OPTIONS;
  }, [theme]);

  const handleThemeChange = (option) => {
    if (option && option.value) {
      setTheme(option.value);
      toast.success("Theme changed successfully!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 min-w-sm">
      <Selectbox
        options={options}
        onChange={handleThemeChange}
        icon={THEME_ICONS[theme]}
        value={theme}
        className="w-full"
        direction="bottom"
        rounded="secondary"
      />
    </div>
  );
}
