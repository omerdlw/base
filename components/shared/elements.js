"use client";

import { useRef, useState, useMemo, useCallback, memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import Icon from "@/components/icon";
import { LoadingSpinner } from "@/components/shared/loadings";

// ============================================================================
// CONSTANTS
// ============================================================================

const COMPONENT_STYLES = {
  base: "center relative cursor-pointer group bg-white/60 dark:bg-black/40 border border-base/10 hover:border-primary p-1 transition",
  iconContainer: "center w-full h-full bg-base/5",
  blur: {
    enabled: "backdrop-blur-xl",
    disabled: "",
  },
};

const SIZE_CONFIGURATIONS = {
  sm: {
    button: { iconOnly: "size-[40px]", withText: "h-[40px]" },
    icon: "w-[30px]",
    text: "text-sm",
  },
  md: {
    button: { iconOnly: "size-[55px]", withText: "h-[55px]" },
    icon: "w-[45px]",
    text: "text-[15px]",
  },
  lg: {
    button: { iconOnly: "size-[65px]", withText: "h-[65px]" },
    icon: "w-[55px]",
    text: "text-lg",
  },
};

const CONFIG = {
  menu: {
    maxHeight: "max-h-[200px]",
    searchThreshold: 8,
  },
  fallback: {
    image: "/placeholder.svg",
  },
};

const TOOLTIP_POSITION_CLASSES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const TOGGLE_SIZE_CLASSES = {
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

const isImageUrl = (url) => {
  return Boolean(url?.startsWith("http"));
};

const filterOptions = (options, query) => {
  if (!query) return options;
  const lowerQuery = query.toLowerCase();
  return options.filter((option) =>
    option.label.toLowerCase().includes(lowerQuery),
  );
};

const calculateMenuPosition = (
  triggerRect,
  menuRect,
  direction,
  menuWidth,
  margin = 8,
) => {
  let top = triggerRect.bottom;
  let left = triggerRect.left;

  switch (direction) {
    case "top":
      top = menuRect
        ? triggerRect.top - menuRect.height - margin
        : triggerRect.top - 200;
      break;
    case "bottom":
      top = triggerRect.bottom + margin;
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
  }

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
    width: menuWidth || triggerRect.width,
  };
};

// ============================================================================
// ICON WRAPPER COMPONENT
// ============================================================================

const IconWrapper = memo(
  ({ rounded = "secondary", className, loading, icon, color, onError }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = useCallback(() => {
      setImageError(true);
      onError?.();
    }, [onError]);

    if (loading) {
      return (
        <div
          className={CN(
            COMPONENT_STYLES.iconContainer,
            rounded && `rounded-${rounded}`,
            className,
          )}
        >
          {icon ? (
            <Icon className="animate-spin" color={color} icon={icon} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      );
    }

    if (isImageUrl(icon)) {
      return (
        <img
          className={CN(
            COMPONENT_STYLES.iconContainer,
            rounded && `rounded-${rounded}`,
            className,
          )}
          src={imageError ? CONFIG.fallback.image : icon}
          alt="Icon"
          onError={handleImageError}
        />
      );
    }

    return (
      <div
        className={CN(
          COMPONENT_STYLES.iconContainer,
          rounded && `rounded-${rounded}`,
          className,
        )}
      >
        {icon && <Icon color={color} icon={icon} />}
      </div>
    );
  },
);

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export const Button = memo(
  ({
    rounded = "secondary",
    loading = false,
    blurry = false,
    tinted = false,
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

    const displayIcon = loading ? (loadingIcon ?? icon) : icon;
    const displayText = loading ? (loadingText ?? text) : text;

    const isIconOnly =
      Boolean(displayIcon && !displayText) || (loading && !displayText);

    const buttonSize = isIconOnly
      ? sizeConfig.button.iconOnly
      : sizeConfig.button.withText;

    const baseClasses = CN(
      blurry ? COMPONENT_STYLES.blur.enabled : COMPONENT_STYLES.blur.disabled,
      tinted && "hover:bg-primary hover:text-white dark:hover:text-white",
      rounded && `rounded-${rounded}`,
      COMPONENT_STYLES.base,
      buttonSize,
      className,
      loading && "cursor-wait opacity-75",
    );

    const handleClick = useCallback(
      (e) => {
        if (!loading && onClick) {
          onClick(e);
        }
      },
      [loading, onClick],
    );

    if (isIconOnly) {
      return (
        <button
          className={baseClasses}
          aria-label={description || "Button"}
          onClick={handleClick}
          type="button"
          disabled={loading}
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
        onClick={handleClick}
        type="button"
        disabled={loading}
        {...props}
      >
        {(displayIcon || (loading && !displayText)) && (
          <IconWrapper
            className={CN(
              !tinted && "group-hover:bg-primary group-hover:text-white",
              "center h-full shrink-0 transition",
              sizeConfig.icon,
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={displayIcon}
          />
        )}
        {displayText && (
          <div className="flex flex-col items-start -space-y-0.5 px-3">
            <span
              className={CN(
                description && "font-semibold",
                sizeConfig.text,
                "text-current",
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
  },
);

// ============================================================================
// SELECTBOX SUB-COMPONENTS
// ============================================================================

const SelectboxMenu = memo(
  ({
    onSearchChange,
    totalOptions,
    searchQuery,
    direction,
    menuWidth,
    onSelect,
    options,
    rounded,
    triggerRef,
    menuRef: externalMenuRef,
    blurry,
  }) => {
    const showSearch = totalOptions >= CONFIG.menu.searchThreshold;
    const nextRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const internalMenuRef = useRef(null);
    const menuRef = externalMenuRef || internalMenuRef;

    const handleSearchChange = useCallback(
      (e) => {
        onSearchChange(e.target.value);
      },
      [onSearchChange],
    );

    useEffect(() => {
      if (!triggerRef?.current) return;

      const updatePosition = () => {
        if (!triggerRef?.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const menuRect = menuRef.current?.getBoundingClientRect();
        const newPosition = calculateMenuPosition(
          triggerRect,
          menuRect,
          direction,
          menuWidth,
        );
        setPosition(newPosition);
      };

      updatePosition();

      const timeoutId = setTimeout(updatePosition, 0);

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [triggerRef, direction, menuWidth, options]);

    // Rounded class'larını dinamik olarak belirle
    const getOptionRoundedClass = (index, totalCount) => {
      const roundedClasses = {
        primary: {
          full: "rounded-primary",
          top: "rounded-t-primary",
          bottom: "rounded-b-primary",
        },
        secondary: {
          full: "rounded-secondary",
          top: "rounded-t-secondary",
          bottom: "rounded-b-secondary",
        },
        tertiary: {
          full: "rounded-tertiary",
          top: "rounded-t-tertiary",
          bottom: "rounded-b-tertiary",
        },
      };

      const classes = roundedClasses[nextRounded] || roundedClasses.secondary;

      if (totalCount === 1) {
        return classes.full;
      }

      if (index === 0 && !showSearch) {
        return classes.top;
      }

      if (index === totalCount - 1) {
        return classes.bottom;
      }

      return "";
    };

    const menuContent = (
      <div
        ref={menuRef}
        className={CN(
          "absolute top-0 overflow-hidden p-1 backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-base/10",
          rounded && `rounded-${rounded}`,
          "z-100",
          blurry
            ? COMPONENT_STYLES.blur.enabled
            : COMPONENT_STYLES.blur.disabled,
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: position.width ? `${position.width}px` : "auto",
        }}
        role="listbox"
      >
        {showSearch && (
          <div onClick={(e) => e.stopPropagation()}>
            <Input
              onChange={handleSearchChange}
              placeholder="Search in options"
              value={searchQuery}
              noBorder
              type="text"
              size="sm"
              className={CN(
                "[&>div]:rounded-b-none",
                nextRounded === "primary" && "[&>div]:rounded-t-primary",
                nextRounded === "secondary" && "[&>div]:rounded-t-secondary",
                nextRounded === "tertiary" && "[&>div]:rounded-t-tertiary",
              )}
            />
          </div>
        )}
        <div
          className={CN(
            CONFIG.menu.maxHeight +
              " overflow-x-hidden overflow-y-auto space-y-0.5",
            rounded && `rounded-b-${nextRounded}`,
            showSearch && "mt-0.5",
          )}
        >
          {options.length === 0 ? (
            <div
              className={CN(
                "p-2.5 text-center bg-base/5 hover:bg-white/60 dark:hover:bg-black/40",
                showSearch
                  ? nextRounded === "primary"
                    ? "rounded-b-primary"
                    : nextRounded === "secondary"
                      ? "rounded-b-secondary"
                      : "rounded-b-tertiary"
                  : nextRounded === "primary"
                    ? "rounded-primary"
                    : nextRounded === "secondary"
                      ? "rounded-secondary"
                      : "rounded-tertiary",
              )}
            >
              <span className="opacity-75 text-sm">No options found</span>
            </div>
          ) : (
            options.map((option, index) => (
              <div
                className={CN(
                  "p-2.5 text-sm cursor-pointer transition-colors bg-base/5 hover:bg-white/60 dark:hover:bg-black/40",
                  getOptionRoundedClass(index, options.length),
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect?.(option);
                }}
                key={option.value}
                role="option"
                tabIndex={0}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      </div>
    );

    if (typeof window === "undefined") return null;

    return createPortal(menuContent, document.body);
  },
);

const SelectboxValue = memo(
  ({
    selectedOption,
    textClassName,
    iconClassName,
    description,
    rounded,
    loading,
    color,
    isOpen,
    icon,
    text,
  }) => {
    const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;

    return (
      <>
        {icon && (
          <IconWrapper
            className={CN(
              isOpen
                ? "bg-primary text-white"
                : "group-hover:bg-primary group-hover:text-white bg-base/5",
              "center h-full shrink-0 transition",
              iconClassName,
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={icon}
          />
        )}
        <div className="flex flex-col items-start -space-y-0.5 px-3 w-full">
          <div
            className={CN(
              "w-full bg-transparent outline-none appearance-none",
              description && "font-semibold",
              textClassName,
            )}
          >
            {selectedOption?.label || text || "Select an option"}
          </div>
          {description && (
            <span className="text-xs opacity-75">{description}</span>
          )}
        </div>
      </>
    );
  },
);

// ============================================================================
// CUSTOM HOOK FOR SELECTBOX
// ============================================================================

const useSelectbox = (options, onChange, value) => {
  const [selectedOption, setSelectedOption] = useState(() => {
    if (value !== undefined) {
      return options.find((opt) => opt.value === value) || options[0] || null;
    }
    return options[0] || null;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      const foundOption = options.find((opt) => opt.value === value);
      if (foundOption) {
        setSelectedOption((prev) =>
          prev?.value !== foundOption.value ? foundOption : prev,
        );
      }
    }
  }, [value, options]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      const isClickInsideSelect = selectRef.current?.contains(event.target);
      const isClickInsideMenu = menuRef.current?.contains(event.target);

      if (!isClickInsideSelect && !isClickInsideMenu) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = useCallback(
    (option) => {
      if (value === undefined) {
        setSelectedOption(option);
      }
      setIsOpen(false);
      setSearchQuery("");
      onChange?.(option);
    },
    [onChange, value],
  );

  const toggleMenu = useCallback(
    (e) => {
      e.stopPropagation();
      setIsOpen((prev) => {
        if (prev) {
          setSearchQuery("");
        }
        return !prev;
      });
    },
    [setSearchQuery],
  );

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
    setSearchQuery,
    selectRef,
    menuRef,
  };
};

// ============================================================================
// SELECTBOX COMPONENT
// ============================================================================

export const Selectbox = memo(
  ({
    rounded = "secondary",
    direction = "top",
    loading = false,
    blurry = false,
    options = [],
    description,
    size = "md",
    className,
    menuWidth,
    onChange,
    color,
    text,
    icon,
    value,
    ...props
  }) => {
    const {
      selectedOption,
      searchQuery,
      isOpen,
      filteredOptions,
      handleSelect,
      toggleMenu,
      setSearchQuery,
      selectRef,
      menuRef,
    } = useSelectbox(options, onChange, value);

    const sizeConfig = SIZE_CONFIGURATIONS[size];

    return (
      <div
        className={CN(
          COMPONENT_STYLES.base,
          rounded && `rounded-${rounded}`,
          sizeConfig.button.withText,
          "relative cursor-pointer",
          isOpen ? "z-20" : "z-10",
          blurry
            ? COMPONENT_STYLES.blur.enabled
            : COMPONENT_STYLES.blur.disabled,
          className,
          isOpen && "border-primary",
        )}
        aria-label={text || description}
        onClick={toggleMenu}
        ref={selectRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        {...props}
      >
        <SelectboxValue
          selectedOption={selectedOption}
          iconClassName={sizeConfig.icon}
          textClassName={sizeConfig.text}
          description={description}
          rounded={rounded}
          loading={loading}
          isOpen={isOpen}
          color={color}
          icon={icon}
          text={text}
        />
        {isOpen && (
          <SelectboxMenu
            onSearchChange={setSearchQuery}
            totalOptions={options.length}
            searchQuery={searchQuery}
            options={filteredOptions}
            onSelect={handleSelect}
            direction={direction}
            menuWidth={menuWidth}
            rounded={rounded}
            triggerRef={selectRef}
            menuRef={menuRef}
            blurry={blurry}
          />
        )}
      </div>
    );
  },
);

// ============================================================================
// INPUT COMPONENT
// ============================================================================

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
    label,
    value,
    error,
    icon,
    ...props
  }) => {
    const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
    const sizeConfig = SIZE_CONFIGURATIONS[size];

    return (
      <div className={CN("flex flex-col gap-2", className)}>
        {label && (
          <label className="text-sm font-medium" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div
          className={CN(
            "group flex items-center w-full border transition focus-within:border-primary",
            error ? "border-error" : "border-base/10",
            noBorder && "!border-0 !border-transparent",
            blurry
              ? COMPONENT_STYLES.blur.enabled
              : COMPONENT_STYLES.blur.disabled,
            "bg-white/60 dark:bg-black/40",
            rounded && `rounded-${rounded}`,
            sizeConfig.button.withText,
            icon && "p-1",
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
            )}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
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

// ============================================================================
// TOGGLE SWITCH COMPONENT
// ============================================================================

export const ToggleSwitch = memo(
  ({ size = "md", className, onChange, checked, rounded, label }) => {
    const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
    const sizeConfig = TOGGLE_SIZE_CLASSES[size];

    return (
      <label className={CN("flex items-center cursor-pointer", className)}>
        <div className="relative">
          <input
            className="sr-only"
            onChange={onChange}
            checked={checked}
            type="checkbox"
          />
          <div
            className={CN(
              "rounded-full shadow-inner transition",
              checked ? "bg-primary" : "bg-base/10",
              rounded && `rounded-${rounded}`,
              sizeConfig.container,
            )}
          />
          <div
            className={CN(
              "absolute bg-white rounded-full shadow transition-transform",
              checked && sizeConfig.translate,
              rounded && `rounded-${iconRounded}`,
              sizeConfig.knob,
            )}
          />
        </div>
        {label && <span className="ml-3 text-sm font-medium">{label}</span>}
      </label>
    );
  },
);

// ============================================================================
// TOOLTIP COMPONENT
// ============================================================================

export const Tooltip = memo(
  ({ position = "top", className, children, content, rounded = "primary" }) => {
    return (
      <div className={CN("relative flex items-center group", className)}>
        {children}
        <div
          className={CN(
            "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
            "backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-base/10",
            "absolute whitespace-nowrap rounded-md px-3 py-2 text-sm",
            TOOLTIP_POSITION_CLASSES[position],
            rounded && `rounded-${rounded}`,
          )}
        >
          {content}
        </div>
      </div>
    );
  },
);

SelectboxValue.displayName = "SelectboxValue";
SelectboxMenu.displayName = "SelectboxMenu";
ToggleSwitch.displayName = "ToggleSwitch";
IconWrapper.displayName = "IconWrapper";
Selectbox.displayName = "Selectbox";
Tooltip.displayName = "Tooltip";
Button.displayName = "Button";
Input.displayName = "Input";
