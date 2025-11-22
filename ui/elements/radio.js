"use client";

import { memo, forwardRef, useCallback, useRef } from "react";
import { CN } from "@/lib/utils";
import { COMPONENT_STYLES } from "./constants";
import { useRadioAnimation } from "./use-animations";
import { arePropsEqual } from "./utils";

export const Radio = memo(
  forwardRef(({ data = {}, visuals = {}, controls = {} }, ref) => {
    const { label, checked, value, name } = data;
    const { className, size = "md" } = visuals;
    const { onChange, disabled, ...restControls } = controls;

    const dotRef = useRef(null);

    const handleChange = useCallback(
      (e) => {
        if (!disabled && onChange) {
          onChange(e.target.value);
        }
      },
      [disabled, onChange]
    );

    useRadioAnimation(dotRef, checked);

    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const dotSizeClasses = {
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
    };

    return (
      <label
        className={CN(
          "flex cursor-pointer items-center",
          disabled && COMPONENT_STYLES.shared.disabled,
          className
        )}
      >
        <div className="relative flex items-center">
          <input
            ref={ref}
            className="peer sr-only"
            onChange={handleChange}
            checked={checked}
            disabled={disabled}
            type="radio"
            name={name}
            value={value}
            aria-checked={checked}
            aria-disabled={disabled}
            {...restControls}
          />
          <div
            className={CN(
              "border-default/20 bg-black/40 border transition-colors peer-focus:border-primary",
              checked ? "border-primary" : "hover:border-primary",
              "rounded-full",
              sizeClasses[size]
            )}
          />
          <div
            ref={dotRef}
            className={CN(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full",
              "pointer-events-none",
              dotSizeClasses[size]
            )}
          />
        </div>
        {label && <span className="ml-3 text-sm font-medium">{label}</span>}
      </label>
    );
  }),
  arePropsEqual
);

Radio.displayName = "Radio";
