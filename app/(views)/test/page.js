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

  // State management
  const [toggleState, setToggleState] = useState({
    sm: false,
    md: true,
    lg: false,
    disabled: true,
  });

  const [checkboxState, setCheckboxState] = useState({
    sm: false,
    md: true,
    lg: false,
    disabled: true,
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
      <div
        style={{
          backgroundImage:
            "url(https://wallpaper.forfun.com/fetch/bd/bd286d338ecdb4785174e5050f67c65d.jpeg?w=1470&r=0.5625&f=webp)",
        }}
        className="w-screen h-screen -z-10 fixed inset-0 bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="w-full h-screen scroll-auto p-8 pb-32 space-y-12 overflow-y-auto">
        {/* BUTTONS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" text="Small" />
                <Button size="md" text="Medium" />
                <Button size="lg" text="Large" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Styles
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button text="Default" />
                <Button text="No Glass" noGlass />
                <Button text="Tinted" tinted icon="solar:star-bold" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                States
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button text="Loading" loading />
                <Button icon="solar:add-circle-bold" text="Loading" loading />
                <Button text="Disabled" disabled />
                <Button icon="solar:settings-bold" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Rounded
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button text="Pri" rounded="primary" size="sm" />
                <Button text="Sec" rounded="secondary" size="sm" />
                <Button text="Ter" rounded="tertiary" size="sm" />
                <Button text="Full" className="rounded-full" size="sm" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
              With Description
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button text="Action" description="Click to perform" />
              <Button
                text="Tinted"
                description="With description"
                tinted
                icon="solar:bolt-bold"
              />
            </div>
          </div>
        </section>

        {/* INPUTS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Variants
              </h3>
              <Input
                label="Default Input"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input label="No Glass" noGlass placeholder="Solid background" />
              <Input
                label="No Border"
                noBorder
                placeholder="Clean look"
                icon="solar:magnifer-linear"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                States & Validation
              </h3>
              <Input label="Required" required placeholder="Required field" />
              <Input
                label="Error State"
                error="Invalid email address"
                value="wrong@input"
                onChange={() => {}}
              />
              <Input label="Disabled" disabled value="Locked value" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Sizes & Icons
              </h3>
              <Input
                size="sm"
                placeholder="Small Input"
                icon="solar:pen-new-square-linear"
              />
              <Input
                size="md"
                placeholder="Medium Input"
                icon="solar:pen-new-square-linear"
              />
              <Input
                size="lg"
                placeholder="Large Input"
                icon="solar:pen-new-square-linear"
              />
            </div>
          </div>
        </section>

        {/* SELECTBOX */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Selectbox
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Default
              </h3>
              <Selectbox
                options={dummyOptions}
                onChange={setSelectedOption}
                value={selectedOption?.value}
                placeholder="Choose option"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                No Glass & Icon
              </h3>
              <Selectbox
                noGlass
                icon="solar:widget-bold"
                options={dummyOptions}
                text="With Icon"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Small
              </h3>
              <Selectbox size="sm" options={dummyOptions} placeholder="Small" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Disabled
              </h3>
              <Selectbox disabled placeholder="Locked" />
            </div>
          </div>
        </section>

        {/* TOGGLES, CHECKBOXES, RADIOS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Toggles, Checkboxes & Radios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Toggles */}
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Toggles
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  size="sm"
                  label="Small Toggle"
                  checked={toggleState.sm}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, sm: checked }))
                  }
                />
                <ToggleSwitch
                  size="md"
                  label="Medium Toggle"
                  checked={toggleState.md}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, md: checked }))
                  }
                />
                <ToggleSwitch
                  size="lg"
                  label="Large Toggle"
                  checked={toggleState.lg}
                  onChange={(checked) =>
                    setToggleState((p) => ({ ...p, lg: checked }))
                  }
                />
                <ToggleSwitch
                  label="Disabled Toggle"
                  checked={toggleState.disabled}
                  disabled
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Checkboxes
              </h3>
              <div className="space-y-3">
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
                <Checkbox
                  label="Disabled Checkbox"
                  checked={checkboxState.disabled}
                  disabled
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Radios */}
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Radios
              </h3>
              <div className="space-y-3">
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
                <Radio
                  name="radio-group-disabled"
                  value="4"
                  label="Disabled Option"
                  checked={true}
                  disabled
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* TOOLTIPS & COLOR PICKER */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Tooltips & Color Picker
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Tooltips
              </h3>
              <div className="flex flex-wrap gap-4">
                <Tooltip content="Top Tooltip" position="top">
                  <Button text="Top" size="sm" />
                </Tooltip>
                <Tooltip content="Bottom Tooltip" position="bottom">
                  <Button text="Bottom" size="sm" />
                </Tooltip>
                <Tooltip content="Left Tooltip" position="left">
                  <Button text="Left" size="sm" />
                </Tooltip>
                <Tooltip content="Right Tooltip" position="right">
                  <Button text="Right" size="sm" />
                </Tooltip>
              </div>
              <div className="mt-4">
                <Tooltip content="Info tooltip on icon" position="right">
                  <div className="p-3 bg-default/10 rounded-full w-fit cursor-help hover:bg-default/20 transition">
                    <Icon icon="solar:info-circle-bold" className="text-xl" />
                  </div>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Color Picker
              </h3>
              <div className="max-w-md p-4 border border-default/10 rounded-primary bg-black/20 backdrop-blur-md">
                <ColorPicker
                  value={color}
                  onChange={setColor}
                  presets={["#3aa7d6", "#e00f5c", "#8fe00f", "#e08f0f"]}
                />
                <div className="mt-4 flex items-center gap-3 text-sm border-t border-default/10 pt-3">
                  <span className="opacity-70">Selected Color:</span>
                  <div className="flex items-center gap-2 bg-default/5 px-2 py-1 rounded-md">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="font-mono font-bold"
                      style={{ color: color }}
                    >
                      {color}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Template>
  );
}
