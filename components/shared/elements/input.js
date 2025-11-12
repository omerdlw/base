"use client";

import { memo } from "react";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from "./helpers";
import IconWrapper from "./icon-wrapper";

export const Input = memo(
    ({
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
    }) => {
        const iconRounded = rounded
            ? GET_NEXT_ROUNDED_LEVEL(rounded)
            : undefined;
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
                        "group flex items-center w-full border transition",
                        COMPONENT_STYLES.shared.focus,
                        error ? "border-error" : "border-base/10",
                        noBorder && "!border-0 !border-transparent !bg-base/5",
                        blurry
                            ? COMPONENT_STYLES.blur.enabled
                            : COMPONENT_STYLES.blur.disabled,
                        "bg-white/60 dark:bg-black/40",
                        rounded && `rounded-${rounded}`,
                        sizeConfig.button.withText,
                        icon && "p-1",
                        disabled && COMPONENT_STYLES.shared.disabled,
                    )}
                >
                    {icon && (
                        <IconWrapper
                            className={CN(
                                sizeConfig.icon,
                                "group-focus-within:bg-primary group-focus-within:text-white",
                                "group-hover:bg-primary group-hover:text-white",
                                "center h-full shrink-0 transition bg-base/5",
                            )}
                            icon={icon}
                            rounded={iconRounded}
                        />
                    )}
                    <input
                        className={CN(
                            "w-full h-full bg-transparent outline-none px-3",
                            sizeConfig.text,
                            disabled && "cursor-not-allowed",
                        )}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type}
                        disabled={disabled}
                        required={required}
                        aria-required={required}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${props.id}-error` : undefined
                        }
                        {...props}
                    />
                </div>
                {error && (
                    <p
                        className="text-sm text-error"
                        id={`${props.id}-error`}
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";
