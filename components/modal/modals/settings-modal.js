import { useSettings } from "@/contexts/settings-context";
import Icon from "@/components/icon";
import { CN } from "@/lib/utils";

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

  return (
    <div className="w-full flex items-center gap-4 p-3">
      {THEME_OPTIONS.map(({ value, label, icon }) => (
        <button
          className={CN(
            "py-5 px-8 rounded-secondary bg-base/5 hover:bg-transparent border border-transparent hover:border-black/10 dark:hover:border-white/10 cursor-pointer transition",
            theme === value && "bg-primary hover:bg-primary",
          )}
          onClick={(e) => {
            e.stopPropagation();
            setTheme(value);
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
