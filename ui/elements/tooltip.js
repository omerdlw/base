"use client";

import { memo, useRef } from "react";
import { CN } from "@/lib/utils";
import { TOOLTIP_POSITION_CLASSES } from "./constants";
import { useTooltipAnimation } from "./use-animations";
import { arePropsEqual } from "./utils";

export const Tooltip = memo(
  ({ data = {}, visuals = {}, controls = {}, children }) => {
    const { content } = data;
    const { rounded = "primary", position = "top", className } = visuals;
    const { disabled = false } = controls;

    const tooltipRef = useRef(null);
    const containerRef = useRef(null);

    useTooltipAnimation(tooltipRef, containerRef, disabled, content);

    return (
      <div
        ref={containerRef}
        className={CN("group relative flex items-center", className)}
      >
        {children}
        {!disabled && content && (
          <div
            ref={tooltipRef}
            className={CN(
              "pointer-events-none opacity-0",
              "border-default/10 border bg-black/40 backdrop-blur-xl",
              "absolute z-50 rounded-md px-3 py-2 text-sm whitespace-nowrap",
              TOOLTIP_POSITION_CLASSES[position],
              rounded && `rounded-${rounded}`
            )}
            role="tooltip"
          >
            {content}
          </div>
        )}
      </div>
    );
  },
  arePropsEqual
);

Tooltip.displayName = "Tooltip";
