"use client";

import { useState, useMemo } from "react";
import Template from "@/app/(views)/template";
import { usePageConfig } from "@/hooks/use-page-config";
import {
  Button,
  Input,
  Selectbox,
  ToggleSwitch,
  Checkbox,
  Radio,
  ColorPicker,
  Tooltip,
} from "@/ui/elements";
import Icon from "@/ui/icon";

export default function TestUIPage() {
  const nav = useMemo(
    () => ({
      name: "UI Kit",
      title: "UI Components",
      icon: "solar:pallete-2-bold",
      description: "Design system elements showcase",
    }),
    []
  );

  usePageConfig({
    nav,
  });

  const [toggleState, setToggleState] = useState({
    sm: false,
    md: true,
    lg: false,
  });
  const [checkboxState, setCheckboxState] = useState({
    sm: false,
    md: true,
    lg: false,
  });
  const [radioValue, setRadioValue] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [color, setColor] = useState("#3aa7d6");

  const dummyOptions = [
    { label: "Option 1", value: "1", icon: "solar:star-bold" },
    { label: "Option 2", value: "2", description: "With description" },
    { label: "Option 3", value: "3", disabled: true },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
  ];

  return (
    <Template>
      <div className="w-full min-h-screen p-8 pb-32 space-y-12 overflow-y-auto">
        <section className="space-y-4">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Sizes</h3>
              <div className="flex items-center gap-2">
                <Button size="sm" text="Small" />
                <Button size="md" text="Medium" />
                <Button size="lg" text="Large" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Styles</h3>
              <div className="flex items-center gap-2">
                <Button text="Default" />
                <Button text="Blurry" blurry />
                <Button text="Tinted" tinted icon="solar:star-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs opacity-50 uppercase">States</h3>
              <div className="flex items-center gap-2">
                <Button text="Loading" loading />
                <Button text="Disabled" disabled />
                <Button icon="solar:settings-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Rounded</h3>
              <div className="flex items-center gap-2">
                <Button text="Pri" rounded="primary" size="sm" />
                <Button text="Sec" rounded="secondary" size="sm" />
                <Button text="Ter" rounded="tertiary" size="sm" />
                <Button text="Full" className="rounded-full" size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Input
                label="Default Input"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="With Icon"
                icon="solar:user-bold"
                placeholder="Username"
              />
              <Input label="Required" required placeholder="Required field" />
            </div>

            <div className="space-y-3">
              <Input label="Blurry Style" blurry placeholder="Glassmorphism" />
              <Input
                label="No Border"
                noBorder
                placeholder="Clean look"
                icon="solar:magnifer-linear"
              />
              <Input
                label="Error State"
                error="Invalid email address"
                value="wrong@input"
                onChange={() => {}}
              />
            </div>

            <div className="space-y-3">
              <Input label="Disabled" disabled value="Locked value" />
              <div className="flex gap-2">
                <Input size="sm" placeholder="Small" />
                <Input size="lg" placeholder="Large" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Selectbox
          </h2>

          <div className="flex flex-wrap gap-4 items-start">
            <div className="w-64 space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Default</h3>
              <Selectbox
                options={dummyOptions}
                onChange={setSelectedOption}
                value={selectedOption?.value}
                placeholder="Choose option"
              />
            </div>

            <div className="w-64 space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Blurry & Icon</h3>
              <Selectbox
                blurry
                icon="solar:widget-bold"
                options={dummyOptions}
                text="With Icon"
              />
            </div>

            <div className="w-48 space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Small</h3>
              <Selectbox size="sm" options={dummyOptions} placeholder="Small" />
            </div>

            <div className="w-48 space-y-2">
              <h3 className="text-xs opacity-50 uppercase">Disabled</h3>
              <Selectbox disabled placeholder="Locked" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Toggles & Tooltips
          </h2>

          <div className="flex flex-wrap gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase">Toggles</h3>
              <div className="space-y-2">
                <ToggleSwitch
                  size="sm"
                  label="Small"
                  checked={toggleState.sm}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, sm: checked }))
                  }
                />
                <ToggleSwitch
                  size="md"
                  label="Medium"
                  checked={toggleState.md}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, md: checked }))
                  }
                />
                <ToggleSwitch
                  size="lg"
                  label="Large"
                  checked={toggleState.lg}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, lg: checked }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase">Checkboxes</h3>
              <div className="space-y-2">
                <Checkbox
                  size="sm"
                  label="Small Checkbox"
                  checked={checkboxState.sm}
                  onChange={(checked) =>
                    setCheckboxState((p) => ({ ...p, sm: checked }))
                  }
                />
                <Checkbox
                  size="md"
                  label="Medium Checkbox"
                  checked={checkboxState.md}
                  onChange={(checked) =>
                    setCheckboxState((p) => ({ ...p, md: checked }))
                  }
                />
                <Checkbox
                  size="lg"
                  label="Large Checkbox"
                  checked={checkboxState.lg}
                  onChange={(checked) =>
                    setCheckboxState((p) => ({ ...p, lg: checked }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase">Radios</h3>
              <div className="space-y-2">
                <Radio
                  name="radio-group"
                  value="1"
                  label="Option 1"
                  checked={radioValue === "1"}
                  onChange={setRadioValue}
                />
                <Radio
                  name="radio-group"
                  value="2"
                  label="Option 2"
                  checked={radioValue === "2"}
                  onChange={setRadioValue}
                />
                <Radio
                  name="radio-group"
                  value="3"
                  label="Option 3"
                  checked={radioValue === "3"}
                  onChange={setRadioValue}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase">Tooltips</h3>
              <div className="flex gap-4">
                <Tooltip content="This is a tooltip" position="top">
                  <Button text="Hover Me (Top)" />
                </Tooltip>
                <Tooltip content="Bottom tooltip" position="bottom">
                  <div className="p-3 bg-default/10 rounded-secondary cursor-help">
                    <Icon icon="solar:info-circle-bold" />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Color Picker
          </h2>
          <div className="max-w-md p-4 border border-default/10 rounded-primary bg-black/20">
            <ColorPicker
              value={color}
              onChange={setColor}
              presets={["#3aa7d6", "#e00f5c", "#8fe00f", "#e08f0f"]}
            />
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span>Selected:</span>
              <span className="font-mono" style={{ color: color }}>
                {color}
              </span>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        </section>
      </div>
    </Template>
  );
}
