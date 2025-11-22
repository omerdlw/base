"use client";

import { memo, useRef } from "react";
import { CN } from "@/lib/utils";
import { TOOLTIP_POSITION_CLASSES } from "./constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Tooltip = memo(
  ({
    rounded = "primary",
    position = "top",
    className,
    disabled,
    children,
    content,
  }) => {
    const tooltipRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
      if (disabled || !content || !tooltipRef.current || !containerRef.current)
        return;

      const tooltip = tooltipRef.current;
      const container = containerRef.current;

      const onEnter = () => {
        gsap.fromTo(
          tooltip,
          { opacity: 0, scale: 0.95, y: 5 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
          }
        );
      };

      const onLeave = () => {
        gsap.to(tooltip, {
          opacity: 0,
          scale: 0.95,
          y: 5,
          duration: 0.2,
          ease: "power2.in",
          force3D: true,
        });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    }, [disabled, content]);

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
              "pointer-events-none opacity-0", // Initial opacity 0, GSAP handles the rest
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
  }
);

Tooltip.displayName = "Tooltip";
