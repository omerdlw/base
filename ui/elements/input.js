"use client";

import { memo, forwardRef } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./constants";
import IconWrapper from "./icon-wrapper";
import { arePropsEqual } from "./utils";

export const Input = memo(
  forwardRef(({ data = {}, visuals = {}, controls = {} }, ref) => {
    const {
      label,
      value,
      error,
      icon,
      placeholder,
      required,
      type = "text",
    } = data;
    const {
      rounded = "secondary",
      noGlass = false,
      size = "md",
      className,
      noBorder,
    } = visuals;
    const { onChange, disabled, id, ...restControls } = controls;

    const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
    const sizeConfig = SIZE_CONFIGURATIONS[size];

    return (
      <div className={CN("flex flex-col gap-2", className)}>
        {label && (
          <label className="text-sm font-medium" htmlFor={id}>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div
          className={CN(
            "group flex w-full items-center border transition",
            COMPONENT_STYLES.shared.focus,
            error ? "border-error" : "border-default/10",
            noBorder && "bg-default/5! border-0!",
            !noGlass
              ? COMPONENT_STYLES.blur.enabled
              : COMPONENT_STYLES.blur.disabled,
            "bg-black/40",
            rounded && `rounded-${rounded}`,
            sizeConfig.button.withText,
            icon && "p-1",
            disabled && COMPONENT_STYLES.shared.disabled
          )}
        >
          {icon && (
            <IconWrapper
              data={{ icon }}
              visuals={{
                rounded: iconRounded,
                className: CN(
                  "center bg-default/5 h-full shrink-0 transition",
                  sizeConfig.icon,
                  "group-focus-within:bg-primary group-focus-within:text-white",
                  "group-hover:bg-primary group-hover:text-white"
                ),
              }}
            />
          )}
          <input
            ref={ref}
            id={id}
            className={CN(
              "h-full w-full bg-transparent px-3 outline-none",
              sizeConfig.text,
              disabled && "cursor-not-allowed"
            )}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error && id ? `${id}-error` : undefined}
            {...restControls}
          />
        </div>
        {error && id && (
          <p className="text-error text-sm" id={`${id}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }),
  arePropsEqual
);

Input.displayName = "Input";
