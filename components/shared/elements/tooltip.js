"use client";

import { memo } from "react";
import { CN } from "@/lib/utils";
import { COMPONENT_STYLES, TOOLTIP_POSITION_CLASSES } from "./helpers";

export const Tooltip = memo(
    ({
        position = "top",
        className,
        children,
        content,
        rounded = "primary",
        disabled,
    }) => {
        return (
            <div className={CN("relative flex items-center group", className)}>
                {children}
                {!disabled && content && (
                    <div
                        className={CN(
                            "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                            "backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-base/10",
                            "absolute whitespace-nowrap rounded-md px-3 py-2 text-sm z-50",
                            TOOLTIP_POSITION_CLASSES[position],
                            rounded && `rounded-${rounded}`,
                        )}
                        role="tooltip"
                    >
                        {content}
                    </div>
                )}
            </div>
        );
    },
);

Tooltip.displayName = "Tooltip";
