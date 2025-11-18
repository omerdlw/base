"use client";

import { memo, useCallback } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./helpers";
import IconWrapper from "./icon-wrapper";

export const Button = memo(
  ({
    rounded = "secondary",
    loading = false,
    blurry = false,
    tinted = false,
    disabled = false,
    loadingText,
    loadingIcon,
    size = "md",
    description,
    className,
    onClick,
    color,
    text,
    icon,
    ...props
  }) => {
    const iconRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const sizeConfig = SIZE_CONFIGURATIONS[size];

    const displayIcon = loading ? loadingIcon ?? icon : icon;
    const displayText = loading ? loadingText ?? text : text;

    const isIconOnly =
      Boolean(displayIcon && !displayText) || (loading && !displayText);

    const buttonSize = isIconOnly
      ? sizeConfig.button.iconOnly
      : sizeConfig.button.withText;

    const isDisabled = disabled || loading;

    const baseClasses = CN(
      blurry ? COMPONENT_STYLES.blur.enabled : COMPONENT_STYLES.blur.disabled,
      tinted && "hover:bg-primary hover:text-white dark:hover:text-white",
      rounded && `rounded-${rounded}`,
      COMPONENT_STYLES.base,
      buttonSize,
      className,
      isDisabled && COMPONENT_STYLES.shared.disabled,
      loading && "cursor-wait"
    );

    const handleClick = useCallback(
      (e) => {
        if (!isDisabled && onClick) {
          onClick(e);
        }
      },
      [isDisabled, onClick]
    );

    if (isIconOnly) {
      return (
        <button
          className={baseClasses}
          aria-label={description || text || "Button"}
          aria-busy={loading}
          onClick={handleClick}
          type="button"
          disabled={isDisabled}
          {...props}
        >
          <IconWrapper
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={displayIcon}
          />
        </button>
      );
    }

    return (
      <button
        className={baseClasses}
        aria-label={displayText || description}
        aria-busy={loading}
        onClick={handleClick}
        type="button"
        disabled={isDisabled}
        {...props}
      >
        {(displayIcon || (loading && !displayText)) && (
          <IconWrapper
            className={CN(
              tinted
                ? "group-hover:bg-black/10"
                : "group-hover:bg-primary group-hover:text-white",
              "center h-full shrink-0 transition",
              sizeConfig.icon
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={displayIcon}
          />
        )}
        {displayText && (
          <div className="w-full flex flex-col items-start -space-y-0.5 px-3">
            <span
              className={CN(
                description && "font-semibold",
                sizeConfig.text,
                "text-current"
              )}
            >
              {displayText}
            </span>
            {description && !loading && (
              <span className="text-xs opacity-75 text-current">
                {description}
              </span>
            )}
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
