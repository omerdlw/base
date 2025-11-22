"use client";

import { memo, forwardRef, useCallback, useRef } from "react";
import { CN } from "@/lib/utils";
import { COMPONENT_STYLES } from "./constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Radio = memo(
  forwardRef(
    (
      {
        className,
        onChange,
        checked,
        disabled,
        label,
        size = "md",
        value,
        name,
        ...props
      },
      ref
    ) => {
      const dotRef = useRef(null);

      const handleChange = useCallback(
        (e) => {
          if (!disabled && onChange) {
            onChange(e.target.value);
          }
        },
        [disabled, onChange]
      );

      // Animation
      useGSAP(() => {
        if (!dotRef.current) return;

        if (checked) {
          gsap.fromTo(
            dotRef.current,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "elastic.out(1, 0.5)",
              force3D: true,
            }
          );
        } else {
          gsap.to(dotRef.current, {
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
              {...props}
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
    }
  )
);

Radio.displayName = "Radio";
