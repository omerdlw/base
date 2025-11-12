"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CN } from "@/lib/utils";

// ============================================================================
// CONSTANTS & CONFIGURATIONS
// ============================================================================

export const COMPONENT_STYLES = {
    base: "center relative cursor-pointer group bg-white/60 dark:bg-black/40 border border-base/10 hover:border-primary p-1 transition",
    iconContainer: "center w-full h-full bg-base/5",
    blur: {
        enabled: "backdrop-blur-xl",
        disabled: "",
    },
    shared: {
        container: "bg-white/60 dark:bg-black/40 border border-base/10",
        hover: "hover:bg-white/60 dark:hover:bg-black/40",
        focus: "focus-within:border-primary",
        disabled: "opacity-50 cursor-not-allowed",
    },
};

export const SIZE_CONFIGURATIONS = {
    sm: {
        button: { iconOnly: "size-[45px]", withText: "h-[45px]" },
        icon: "w-[35px]",
        text: "text-sm",
    },
    md: {
        button: { iconOnly: "size-[55px]", withText: "h-[55px]" },
        icon: "w-[45px]",
        text: "text-base",
    },
    lg: {
        button: { iconOnly: "size-[65px]", withText: "h-[65px]" },
        icon: "w-[55px]",
        text: "text-lg",
    },
};

export const SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS = {
    sm: {
        button: { withText: "h-[38px]" },
        icon: "w-[28px]",
        text: "text-xs",
    },
    md: {
        button: { withText: "h-[46px]" },
        icon: "w-[36px]",
        text: "text-sm",
    },
    lg: {
        button: { withText: "h-[54px]" },
        icon: "w-[44px]",
        text: "text-base",
    },
};

export const CONFIG = {
    menu: {
        maxHeight: "max-h-[200px]",
        searchThreshold: 8,
    },
    fallback: {
        image: "/placeholder.svg",
    },
    imageRetry: {
        maxRetries: 3,
        backoffMultiplier: 1000,
    },
};

export const TOOLTIP_POSITION_CLASSES = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const TOGGLE_SIZE_CLASSES = {
    sm: {
        knob: "w-5 h-5 top-1 left-1",
        translate: "translate-x-5",
        container: "w-12 h-7",
    },
    md: {
        knob: "w-6 h-6 top-1 left-1",
        translate: "translate-x-6",
        container: "w-14 h-8",
    },
    lg: {
        knob: "w-7 h-7 top-1 left-1",
        translate: "translate-x-7",
        container: "w-16 h-9",
    },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const isImageUrl = (url) => {
    return Boolean(url?.startsWith("http"));
};

export const filterOptions = (options, query) => {
    if (!query) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((option) =>
        option.label.toLowerCase().includes(lowerQuery),
    );
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

export const calculateMenuPosition = (
    triggerRect,
    menuRect,
    direction,
    menuWidth,
    margin = 8,
) => {
    let top;
    let left = triggerRect.left;

    switch (direction) {
        case "top":
            top = menuRect
                ? triggerRect.bottom - menuRect.height
                : triggerRect.bottom - 200;
            break;
        case "bottom":
            top = triggerRect.top;
            break;
        case "left":
            left = menuRect
                ? triggerRect.left - menuRect.width - margin
                : triggerRect.left - (menuWidth || triggerRect.width) - margin;
            top = triggerRect.top;
            break;
        case "right":
            left = triggerRect.right + margin;
            top = triggerRect.top;
            break;
        default:
            top = triggerRect.bottom;
            break;
    }

    return {
        top: top + window.scrollY,
        left: left + window.scrollX,
        width: menuWidth || triggerRect.width,
    };
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

export const useImageWithRetry = (
    src,
    maxRetries = CONFIG.imageRetry.maxRetries,
) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setCurrentSrc(src);
        setRetryCount(0);
        setHasError(false);
    }, [src]);

    const handleError = useCallback(() => {
        if (retryCount < maxRetries) {
            const backoffTime =
                CONFIG.imageRetry.backoffMultiplier * (retryCount + 1);
            setTimeout(() => {
                setCurrentSrc(`${src}?retry=${retryCount + 1}`);
                setRetryCount((prev) => prev + 1);
            }, backoffTime);
        } else {
            setCurrentSrc(CONFIG.fallback.image);
            setHasError(true);
        }
    }, [src, retryCount, maxRetries]);

    return { currentSrc, handleError, hasError };
};

export const useKeyboardNavigation = (options, isOpen, onSelect, onClose) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        if (!isOpen) {
            setFocusedIndex(-1);
            return;
        }

        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setFocusedIndex((prev) =>
                        Math.min(prev + 1, options.length - 1),
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setFocusedIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (focusedIndex >= 0 && options[focusedIndex]) {
                        onSelect(options[focusedIndex]);
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    onClose();
                    break;
                case "Home":
                    e.preventDefault();
                    setFocusedIndex(0);
                    break;
                case "End":
                    e.preventDefault();
                    setFocusedIndex(options.length - 1);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, focusedIndex, options, onSelect, onClose]);

    return { focusedIndex, setFocusedIndex };
};

export const useSelectbox = (options, onChange, value) => {
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState(() => {
        if (isControlled) {
            return (
                options.find((opt) => opt.value === value) || options[0] || null
            );
        }
        return options[0] || null;
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const menuRef = useRef(null);

    const selectedOption = isControlled
        ? options.find((opt) => opt.value === value) || null
        : internalValue;

    useEffect(() => {
        if (isControlled && value !== undefined) {
            const foundOption = options.find((opt) => opt.value === value);
            if (foundOption) {
                setInternalValue((prev) =>
                    prev?.value !== foundOption.value ? foundOption : prev,
                );
            }
        }
    }, [value, options, isControlled]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            const isClickInsideSelect = selectRef.current?.contains(
                event.target,
            );
            const isClickInsideMenu = menuRef.current?.contains(event.target);

            if (!isClickInsideSelect && !isClickInsideMenu) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleSelect = useCallback(
        (option) => {
            if (!option || option.disabled) return;

            if (!isControlled) {
                setInternalValue(option);
            }
            setIsOpen(false);
            setSearchQuery("");
            onChange?.(option);
        },
        [onChange, isControlled],
    );

    const toggleMenu = useCallback(
        (e) => {
            e?.stopPropagation();
            setIsOpen((prev) => {
                if (prev) {
                    setSearchQuery("");
                }
                return !prev;
            });
        },
        [setSearchQuery],
    );

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        setSearchQuery("");
    }, []);

    const filteredOptions = useMemo(
        () => filterOptions(options, searchQuery),
        [options, searchQuery],
    );

    return {
        selectedOption,
        searchQuery,
        isOpen,
        filteredOptions,
        handleSelect,
        toggleMenu,
        closeMenu,
        setSearchQuery,
        selectRef,
        menuRef,
    };
};
