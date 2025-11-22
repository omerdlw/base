"use client";

import { memo, forwardRef, useCallback, useRef } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES } from "./constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Checkbox = memo(
  forwardRef(
    (
      {
        className,
        onChange,
        checked,
        disabled,
        rounded = "secondary",
        label,
        size = "md",
        ...props
      },
      ref
    ) => {
      const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
      const checkRef = useRef(null);

      const handleChange = useCallback(
        (e) => {
          if (!disabled && onChange) {
            onChange(e.target.checked);
          }
        },
        [disabled, onChange]
      );

      // Animation
      useGSAP(() => {
        if (!checkRef.current) return;

        if (checked) {
          gsap.fromTo(
            checkRef.current,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
              force3D: true,
            }
          );
        } else {
          gsap.to(checkRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            force3D: true,
          });
        }
      }, [checked]);

      const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
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
              type="checkbox"
              aria-checked={checked}
              aria-disabled={disabled}
              {...props}
            />
            <div
              className={CN(
                "border-default/20 bg-black/40 border transition-colors peer-focus:border-primary",
                checked ? "bg-primary border-primary" : "hover:border-primary",
                rounded && `rounded-${rounded}`,
                sizeClasses[size]
              )}
            />
            <div
              ref={checkRef}
              className={CN(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white",
                "pointer-events-none"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={CN(
                  size === "sm"
                    ? "w-3 h-3"
                    : size === "lg"
                      ? "w-4 h-4"
                      : "w-3.5 h-3.5"
                )}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          {label && <span className="ml-3 text-sm font-medium">{label}</span>}
        </label>
      );
    }
  )
);

Checkbox.displayName = "Checkbox";
