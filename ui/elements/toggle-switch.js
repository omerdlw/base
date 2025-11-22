"use client";

import { memo, forwardRef, useCallback, useRef } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES, TOGGLE_SIZE_CLASSES } from "./constants";
import { useToggleAnimation } from "./use-animations";

export const ToggleSwitch = memo(
  forwardRef(
    (
      {
        size = "md",
        className,
        onChange,
        checked,
        disabled,
        rounded = "full",
        label,
        ...props
      },
      ref
    ) => {
      const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
      const sizeConfig = TOGGLE_SIZE_CLASSES[size];
      const knobRef = useRef(null);

      const handleChange = useCallback(
        (e) => {
          if (!disabled && onChange) {
            onChange(e.target.checked);
          }
        },
        [disabled, onChange]
      );

      useToggleAnimation(knobRef, checked, sizeConfig);

      return (
        <label
          className={CN(
            "flex cursor-pointer items-center",
            disabled && COMPONENT_STYLES.shared.disabled,
            className
          )}
        >
          <div className="relative">
            <input
              ref={ref}
              className="sr-only"
              onChange={handleChange}
              checked={checked}
              disabled={disabled}
              type="checkbox"
              aria-checked={checked}
              aria-disabled={disabled}
              {...props}
            />
            <div
              className={CN(
                "rounded-full shadow-inner transition",
                checked ? "bg-primary" : "bg-default/10",
                rounded && `rounded-${rounded}`,
                sizeConfig.container
              )}
            />
            <div
              ref={knobRef}
              className={CN(
                "absolute rounded-full bg-white shadow", // Removed transition-transform to let GSAP handle it
                // checked && sizeConfig.translate, // Removed class-based translation
                rounded && `rounded-${iconRounded}`,
                sizeConfig.knob
              )}
            />
          </div>
          {label && <span className="ml-3 text-sm font-medium">{label}</span>}
        </label>
      );
    }
  )
);

ToggleSwitch.displayName = "ToggleSwitch";
