"use client";

import { memo, forwardRef, useRef, useImperativeHandle } from "react";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./constants";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import IconWrapper from "./icon-wrapper";
import { useHoverAnimation, useClickAnimation } from "./use-animations";
import { arePropsEqual } from "./utils";

export const Button = memo(
  forwardRef(({ data = {}, visuals = {}, controls = {} }, ref) => {
    const { text, icon, loading, loadingText, description } = data;
    const {
      rounded = "secondary",
      noGlass = false,
      tinted = false,
      size = "md",
      className,
      color,
    } = visuals;
    const {
      disabled = false,
      type = "button",
      onClick,
      ...restControls
    } = controls;

    const internalRef = useRef(null);
    useImperativeHandle(ref, () => internalRef.current);

    const iconRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const sizeConfig = SIZE_CONFIGURATIONS[size];

    const displayIcon = loading ? "mingcute:loading-3-fill" : icon;
    const displayText = loading ? (loadingText ?? text) : text;

    const isIconOnly = Boolean(displayIcon && !displayText);
    const isDisabled = disabled || loading;

    const { onMouseEnter, onMouseLeave } = useHoverAnimation(
      internalRef,
      isDisabled
    );
    const { onMouseDown, onMouseUp } = useClickAnimation(
      internalRef,
      isDisabled
    );

    const buttonSizeClass = isIconOnly
      ? sizeConfig.button.iconOnly
      : sizeConfig.button.withText;

    const baseClasses = CN(
      COMPONENT_STYLES.base,
      buttonSizeClass,
      rounded && `rounded-${rounded}`,
      !noGlass ? COMPONENT_STYLES.blur.enabled : COMPONENT_STYLES.blur.disabled,
      tinted && "hover:bg-primary hover:text-white dark:hover:text-white",
      isDisabled && COMPONENT_STYLES.shared.disabled,
      loading && "cursor-wait",
      className
    );

    const content = (
      <>
        {((icon && displayIcon) || (loading && !displayText)) && (
          <IconWrapper
            data={{ icon: displayIcon, loading }}
            visuals={{
              rounded: iconRounded,
              color,
              className: CN(
                "center h-full shrink-0 transition",
                sizeConfig.icon,
                tinted
                  ? "group-hover:bg-black/10"
                  : "group-hover:bg-primary group-hover:text-white",
                isIconOnly && "w-full"
              ),
            }}
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
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        {...restControls}
      >
        {content}
      </button>
    );
  }),
  arePropsEqual
);

Button.displayName = "Button";
