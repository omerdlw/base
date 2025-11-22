"use client";

import { useTheme } from "@/contexts/theme-context";
import { CN } from "@/lib/utils";
import Icon from "@/ui/icon";
import { ColorPicker } from "@/ui/elements";
import { COMPONENT_STYLES } from "@/ui/elements/constants";
import Container from "@/modules/modal/container";

export default function SettingsModal({ header, close }) {
  const { theme, setPrimaryColor, setRadiusPreset, presets } = useTheme();

  return (
    <Container header={header} close={close}>
      <div className="flex flex-col gap-8 p-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold opacity-90">
              Primary Color
            </label>
            <span className="text-xs font-mono opacity-50 uppercase bg-default/5 px-2 py-1 rounded-tertiary">
              {theme.primary}
            </span>
          </div>
          <ColorPicker
            value={theme.primary}
            onChange={setPrimaryColor}
            presets={presets.colors}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold opacity-90">
              Corner Radius
            </label>
            <span className="text-xs font-mono opacity-50 uppercase bg-default/5 px-2 py-1 rounded-tertiary">
              {theme.radius}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "sharp", label: "Sharp" },
              { id: "smooth", label: "Smooth" },
              { id: "round", label: "Round" },
            ].map((item) => {
              const isSelected = theme.radius === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRadiusPreset(item.id)}
                  className={CN(
                    COMPONENT_STYLES.base,
                    "center py-4 h-auto rounded-secondary transition-all duration-300",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent hover:bg-default/10 bg-default/5"
                  )}
                >
                  <Icon icon={item.icon} size={26} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
