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
      <div className="w-screen h-screen -z-10 fixed inset-0 bg-cover bg-center bg-no-repeat"></div>
      <div className="w-full h-screen scroll-auto p-8 pb-32 space-y-12 overflow-y-auto">
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
                <Button data={{ text: "Small" }} visuals={{ size: "sm" }} />
                <Button data={{ text: "Medium" }} visuals={{ size: "md" }} />
                <Button data={{ text: "Large" }} visuals={{ size: "lg" }} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Styles
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button data={{ text: "Default" }} />
                <Button
                  data={{ text: "No Glass" }}
                  visuals={{ noGlass: true }}
                />
                <Button
                  data={{ text: "Tinted", icon: "solar:star-bold" }}
                  visuals={{ tinted: true }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                States
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button data={{ text: "Loading", loading: true }} />
                <Button
                  data={{
                    text: "Loading",
                    loading: true,
                    icon: "solar:add-circle-bold",
                  }}
                />
                <Button
                  data={{ text: "Disabled" }}
                  controls={{ disabled: true }}
                />
                <Button data={{ icon: "solar:settings-bold" }} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Rounded
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  data={{ text: "Pri" }}
                  visuals={{ rounded: "primary", size: "sm" }}
                />
                <Button
                  data={{ text: "Sec" }}
                  visuals={{ rounded: "secondary", size: "sm" }}
                />
                <Button
                  data={{ text: "Ter" }}
                  visuals={{ rounded: "tertiary", size: "sm" }}
                />
                <Button
                  data={{ text: "Full" }}
                  visuals={{ className: "rounded-full", size: "sm" }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
              With Description
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                data={{ text: "Action", description: "Click to perform" }}
              />
              <Button
                data={{
                  text: "Tinted",
                  description: "With description",
                  icon: "solar:bolt-bold",
                }}
                visuals={{ tinted: true }}
              />
            </div>
          </div>
        </section>

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
                data={{
                  label: "Default Input",
                  placeholder: "Type something...",
                  value: inputValue,
                }}
                controls={{
                  onChange: (e) => setInputValue(e.target.value),
                }}
              />
              <Input
                data={{
                  label: "No Glass",
                  placeholder: "Solid background",
                }}
                visuals={{ noGlass: true }}
              />
              <Input
                data={{
                  label: "No Border",
                  placeholder: "Clean look",
                  icon: "solar:magnifer-linear",
                }}
                visuals={{ noBorder: true }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                States & Validation
              </h3>
              <Input
                data={{
                  label: "Required",
                  placeholder: "Required field",
                  required: true,
                }}
              />
              <Input
                data={{
                  label: "Error State",
                  error: "Invalid email address",
                  value: "wrong@input",
                }}
                controls={{ onChange: () => {} }}
              />
              <Input
                data={{ label: "Disabled", value: "Locked value" }}
                controls={{ disabled: true }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Sizes & Icons
              </h3>
              <Input
                data={{
                  placeholder: "Small Input",
                  icon: "solar:pen-new-square-linear",
                }}
                visuals={{ size: "sm" }}
              />
              <Input
                data={{
                  placeholder: "Medium Input",
                  icon: "solar:pen-new-square-linear",
                }}
                visuals={{ size: "md" }}
              />
              <Input
                data={{
                  placeholder: "Large Input",
                  icon: "solar:pen-new-square-linear",
                }}
                visuals={{ size: "lg" }}
              />
            </div>
          </div>
        </section>

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
                data={{
                  options: dummyOptions,
                  value: selectedOption?.value,
                  placeholder: "Choose option",
                }}
                controls={{ onChange: setSelectedOption }}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                No Glass & Icon
              </h3>
              <Selectbox
                data={{
                  icon: "solar:widget-bold",
                  options: dummyOptions,
                  text: "With Icon",
                }}
                visuals={{ noGlass: true }}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Small
              </h3>
              <Selectbox
                data={{ options: dummyOptions, placeholder: "Small" }}
                visuals={{ size: "sm" }}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Disabled
              </h3>
              <Selectbox
                data={{ placeholder: "Locked" }}
                controls={{ disabled: true }}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold opacity-80 border-b border-default/10 pb-2">
            Toggles, Checkboxes & Radios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Toggles
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  data={{ label: "Small Toggle", checked: toggleState.sm }}
                  visuals={{ size: "sm" }}
                  controls={{
                    onChange: (v) => setToggleState((p) => ({ ...p, sm: v })),
                  }}
                />
                <ToggleSwitch
                  data={{ label: "Medium Toggle", checked: toggleState.md }}
                  visuals={{ size: "md" }}
                  controls={{
                    onChange: (v) => setToggleState((p) => ({ ...p, md: v })),
                  }}
                />
                <ToggleSwitch
                  data={{ label: "Large Toggle", checked: toggleState.lg }}
                  visuals={{ size: "lg" }}
                  controls={{
                    onChange: (v) => setToggleState((p) => ({ ...p, lg: v })),
                  }}
                />
                <ToggleSwitch
                  data={{
                    label: "Disabled Toggle",
                    checked: toggleState.disabled,
                  }}
                  controls={{ disabled: true, onChange: () => {} }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Checkboxes
              </h3>
              <div className="space-y-3">
                <Checkbox
                  data={{ label: "Small Checkbox", checked: checkboxState.sm }}
                  visuals={{ size: "sm" }}
                  controls={{
                    onChange: (v) => setCheckboxState((p) => ({ ...p, sm: v })),
                  }}
                />
                <Checkbox
                  data={{
                    label: "Medium Checkbox",
                    checked: checkboxState.md,
                  }}
                  visuals={{ size: "md" }}
                  controls={{
                    onChange: (v) => setCheckboxState((p) => ({ ...p, md: v })),
                  }}
                />
                <Checkbox
                  data={{ label: "Large Checkbox", checked: checkboxState.lg }}
                  visuals={{ size: "lg" }}
                  controls={{
                    onChange: (v) => setCheckboxState((p) => ({ ...p, lg: v })),
                  }}
                />
                <Checkbox
                  data={{
                    label: "Disabled Checkbox",
                    checked: checkboxState.disabled,
                  }}
                  controls={{ disabled: true, onChange: () => {} }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs opacity-50 uppercase font-semibold tracking-wider">
                Radios
              </h3>
              <div className="space-y-3">
                <Radio
                  data={{
                    name: "radio-group",
                    value: "1",
                    label: "Option 1",
                    checked: radioValue === "1",
                  }}
                  controls={{ onChange: setRadioValue }}
                />
                <Radio
                  data={{
                    name: "radio-group",
                    value: "2",
                    label: "Option 2",
                    checked: radioValue === "2",
                  }}
                  controls={{ onChange: setRadioValue }}
                />
                <Radio
                  data={{
                    name: "radio-group",
                    value: "3",
                    label: "Option 3",
                    checked: radioValue === "3",
                  }}
                  controls={{ onChange: setRadioValue }}
                />
                <Radio
                  data={{
                    name: "radio-group-disabled",
                    value: "4",
                    label: "Disabled Option",
                    checked: true,
                  }}
                  controls={{ disabled: true, onChange: () => {} }}
                />
              </div>
            </div>
          </div>
        </section>

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
                <Tooltip
                  data={{ content: "Top Tooltip" }}
                  visuals={{ position: "top" }}
                >
                  <Button data={{ text: "Top" }} visuals={{ size: "sm" }} />
                </Tooltip>
                <Tooltip
                  data={{ content: "Bottom Tooltip" }}
                  visuals={{ position: "bottom" }}
                >
                  <Button data={{ text: "Bottom" }} visuals={{ size: "sm" }} />
                </Tooltip>
                <Tooltip
                  data={{ content: "Left Tooltip" }}
                  visuals={{ position: "left" }}
                >
                  <Button data={{ text: "Left" }} visuals={{ size: "sm" }} />
                </Tooltip>
                <Tooltip
                  data={{ content: "Right Tooltip" }}
                  visuals={{ position: "right" }}
                >
                  <Button data={{ text: "Right" }} visuals={{ size: "sm" }} />
                </Tooltip>
              </div>
              <div className="mt-4">
                <Tooltip
                  data={{ content: "Info tooltip on icon" }}
                  visuals={{ position: "right" }}
                >
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
                  data={{
                    value: color,
                    presets: ["#3aa7d6", "#e00f5c", "#8fe00f", "#e08f0f"],
                  }}
                  controls={{ onChange: setColor }}
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
