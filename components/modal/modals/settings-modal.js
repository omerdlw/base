"use client";

import { useSettings } from "@/contexts/settings-context";
import Icon from "@/components/icon";
import { CN } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

const THEME_OPTIONS = [
  { value: "light", icon: <Icon icon={"solar:sun-2-bold"} /> },
  { value: "dark", icon: <Icon icon={"solar:moon-bold"} /> },
  {
    value: "system",
    icon: <Icon icon={"solar:screencast-2-bold"} />,
  },
];

export default function SettingsModal() {
  const { theme, setTheme } = useSettings();
  const toast = useToast();

  return (
    <div className="w-full flex items-center gap-4 p-3">
      {THEME_OPTIONS.map(({ value, icon }) => (
        <button
          className={CN(
            "py-5 px-8 rounded-secondary bg-base/5 hover:bg-transparent border border-transparent hover:border-black/10 dark:hover:border-white/10 cursor-pointer transition",
            theme === value && "bg-primary hover:bg-primary",
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (theme !== value) {
              // Sadece farklı bir tema seçilirse
              setTheme(value);
              toast.success("Theme changed successfully!");
            }
          }}
          aria-pressed={theme === value}
          type="button"
          key={value}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
