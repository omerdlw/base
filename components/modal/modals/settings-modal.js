"use client";

import { Selectbox } from "@/components/shared/elements";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";

const THEME_OPTIONS = [
    { value: "light", label: "Light", icon: "solar:sun-2-bold" },
    { value: "dark", label: "Dark", icon: "solar:moon-bold" },
    { value: "system", label: "System", icon: "solar:screencast-2-bold" },
];

export default function SettingsModal() {
    const { theme, setTheme } = useSettings();
    const toast = useToast();

    const handleThemeChange = (option) => {
        if (option && option.value) {
            setTheme(option.value);
            toast.success("Theme changed successfully!");
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-3 p-4 min-w-sm">
            <Selectbox
                options={THEME_OPTIONS}
                onChange={handleThemeChange}
                value={theme}
                className="w-full"
                direction="bottom"
                rounded="secondary"
            />
        </div>
    );
}
