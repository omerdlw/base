"use client";

import { memo, forwardRef } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./constants";
import IconWrapper from "./icon-wrapper";

export const Input = memo(
  forwardRef(
    (
      {
        rounded = "secondary",
        blurry = false,
        type = "text",
        placeholder,
        size = "md",
        className,
        noBorder,
        onChange,
        disabled,
        required,
        label,
        value,
        error,
        icon,
        ...props
      },
      ref
    ) => {
      const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
      const sizeConfig = SIZE_CONFIGURATIONS[size];

      return (
        <div className={CN("flex flex-col gap-2", className)}>
          {label && (
            <label className="text-sm font-medium" htmlFor={props.id}>
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
          )}
          <div
            className={CN(
              "group flex w-full items-center border transition",
              COMPONENT_STYLES.shared.focus,
              error ? "border-error" : "border-default/10",
              noBorder && "bg-default/5! border-0! border-transparent!",
              blurry
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
                className={CN(
                  "center bg-default/5 h-full shrink-0 transition",
                  sizeConfig.icon,
                  "group-focus-within:bg-primary group-focus-within:text-white",
                  "group-hover:bg-primary group-hover:text-white"
                )}
                icon={icon}
                rounded={iconRounded}
              />
            )}
            <input
              ref={ref}
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
              aria-describedby={error ? `${props.id}-error` : undefined}
              {...props}
            />
          </div>
          {error && (
            <p
              className="text-error text-sm"
              id={`${props.id}-error`}
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = "Input";
