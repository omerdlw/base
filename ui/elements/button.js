"use client";

import {
  memo,
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./constants";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import IconWrapper from "./icon-wrapper";
import { useHoverEffect, useClickEffect } from "./use-animations";

export const Button = memo(
  forwardRef(
    (
      {
        rounded = "secondary",
        loading = false,
        noGlass = false,
        tinted = false,
        disabled = false,
        loadingText,
        size = "md",
        description,
        className,
        onClick,
        color,
        text,
        icon,
        type = "button",
        ...props
      },
      ref
    ) => {
      const internalRef = useRef(null);

      useImperativeHandle(ref, () => internalRef.current);

      const iconRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
      const sizeConfig = SIZE_CONFIGURATIONS[size];

      const displayIcon = loading ? "mingcute:loading-3-fill" : icon;
      const displayText = loading ? (loadingText ?? text) : text;

      const isIconOnly = Boolean(displayIcon && !displayText);
      const isDisabled = disabled || loading;

      useHoverEffect(internalRef, isDisabled);
      useClickEffect(internalRef, isDisabled);

      const buttonSizeClass = isIconOnly
        ? sizeConfig.button.iconOnly
        : sizeConfig.button.withText;

      const baseClasses = CN(
        COMPONENT_STYLES.base,
        buttonSizeClass,
        rounded && `rounded-${rounded}`,
        !noGlass
          ? COMPONENT_STYLES.blur.enabled
          : COMPONENT_STYLES.blur.disabled,
        tinted && "hover:bg-primary hover:text-white dark:hover:text-white",
        isDisabled && COMPONENT_STYLES.shared.disabled,
        loading && "cursor-wait",
        className
      );

      const handleClick = useCallback(
        (e) => {
          if (!isDisabled && onClick) {
            onClick(e);
          }
        },
        [isDisabled, onClick]
      );

      const content = (
        <>
          {((icon && displayIcon) || (loading && !displayText)) && (
            <IconWrapper
              className={CN(
                "center h-full shrink-0 transition ",
                sizeConfig.icon,
                tinted
                  ? "group-hover:bg-black/10"
                  : "group-hover:bg-primary group-hover:text-white",
                isIconOnly && "w-full"
              )}
              rounded={iconRounded}
              loading={loading}
              color={color}
              icon={displayIcon}
            />
          )}
          {displayText && (
            <div className="flex w-full flex-col items-start -space-y-0.5 px-3">
              <span
                className={CN(
                  "text-current",
                  sizeConfig.text,
                  description && "font-semibold",
                  loading &&
                    "animate-shine bg-linear-to-r from-transparent via-white/50 to-transparent bg-size-[200%_100%] bg-clip-text text-transparent"
                )}
              >
                {displayText}
              </span>
              {description && !loading && (
                <span className="text-xs text-current opacity-70">
                  {description}
                </span>
              )}
            </div>
          )}
        </>
      );

      return (
        <button
          ref={internalRef}
          className={baseClasses}
          aria-label={displayText || description || text || "Button"}
          aria-busy={loading}
          onClick={handleClick}
          type={type}
          disabled={isDisabled}
          {...props}
        >
          {content}
        </button>
      );
    }
  )
);

Button.displayName = "Button";
