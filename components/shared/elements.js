"use client";

import { useRef, useState, useMemo, useCallback, memo } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import Icon from "@/components/icon";

// ============================================================================
// CONSTANTS
// ============================================================================

const COMPONENT_STYLES = {
  base: "center cursor-pointer group rounded-primary bg-white/60 dark:bg-black/40 border border-base/10 hover:border-primary p-1 transition",
  iconContainer: "center w-full h-full",
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
    text: "text-base",
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
    searchThreshold: 12,
  },
  fallback: {
    image: "/placeholder.svg",
  },
};

const SELECTBOX_POSITION_CLASSES = {
  bottom: "top-full mt-2",
  top: "bottom-full mb-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
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
        {icon && (
          <Icon
            className={loading ? "animate-spin" : ""}
            color={color}
            icon={icon}
          />
        )}
      </div>
    );
  },
);

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export const Button = memo(
  ({
    rounded = "primary",
    colorful = false,
    loading = false,
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
    const isIconOnly = Boolean(icon && !text);

    const buttonSize = isIconOnly
      ? sizeConfig.button.iconOnly
      : sizeConfig.button.withText;

    const baseClasses = CN(
      colorful && "hover:bg-primary hover:text-white dark:hover:text-white",
      rounded && `rounded-${rounded}`,
      COMPONENT_STYLES.base,
      buttonSize,
      className,
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
            icon={icon}
          />
        </button>
      );
    }

    return (
      <button
        className={baseClasses}
        aria-label={text || description}
        onClick={handleClick}
        type="button"
        disabled={loading}
        {...props}
      >
        {icon && (
          <IconWrapper
            className={CN(
              !colorful && "group-hover:bg-primary group-hover:text-white",
              "center h-full shrink-0 transition",
              sizeConfig.icon,
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={icon}
          />
        )}
        {text && (
          <div className="flex flex-col items-start -space-y-0.5 px-3">
            <span className={CN(sizeConfig.text, "text-current")}>{text}</span>
            {description && (
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
  }) => {
    const showSearch = totalOptions > CONFIG.menu.searchThreshold;

    const handleSearchChange = useCallback(
      (e) => {
        onSearchChange(e.target.value);
      },
      [onSearchChange],
    );

    return (
      <div
        className={CN(
          "absolute rounded-primary p-1 backdrop-blur-lg bg-white/60 dark:bg-black/40 border border-base/10 z-50",
          SELECTBOX_POSITION_CLASSES[direction],
          rounded && `rounded-${rounded}`,
          menuWidth || "w-full",
        )}
        role="listbox"
      >
        {showSearch && (
          <div onClick={(e) => e.stopPropagation()}>
            <Input
              onChange={handleSearchChange}
              className="rounded-secondary"
              placeholder="Search"
              value={searchQuery}
              rounded="secondary"
              type="text"
              size="sm"
            />
          </div>
        )}
        <div
          className={CN(
            CONFIG.menu.maxHeight + " overflow-y-auto",
            showSearch && "mt-1",
          )}
        >
          {options.length === 0 ? (
            <div className="p-2.5 text-sm text-center opacity-50">
              No options found
            </div>
          ) : (
            options.map((option) => (
              <div
                className="p-2.5 text-sm hover:bg-base/10 cursor-pointer rounded-secondary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(option);
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
                : "group-hover:bg-primary group-hover:text-white",
              "center h-full shrink-0 bg-base/5 transition",
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
              textClassName,
            )}
          >
            {selectedOption?.label || text || "Select an option"}
          </div>
          {description && (
            <span className="text-xs opacity-70">{description}</span>
          )}
        </div>
      </>
    );
  },
);

// ============================================================================
// CUSTOM HOOK FOR SELECTBOX
// ============================================================================

const useSelectbox = (options, onChange) => {
  const [selectedOption, setSelectedOption] = useState(options[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useClickOutside(selectRef, () => {
    setIsOpen(false);
    setSearchQuery("");
  });

  const handleSelect = useCallback(
    (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      setSearchQuery("");
      onChange?.(option);
    },
    [onChange],
  );

  const toggleMenu = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
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
    setSearchQuery,
    selectRef,
  };
};

// ============================================================================
// SELECTBOX COMPONENT
// ============================================================================

export const Selectbox = memo(
  ({
    direction = "bottom",
    loading = false,
    options = [],
    size = "md",
    description,
    className,
    menuWidth,
    onChange,
    rounded,
    color,
    text,
    icon,
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
    } = useSelectbox(options, onChange);

    const sizeConfig = SIZE_CONFIGURATIONS[size];

    return (
      <div
        className={CN(
          rounded && `rounded-${rounded}`,
          sizeConfig.button.withText,
          isOpen && "border-primary",
          "relative cursor-pointer",
          isOpen ? "z-20" : "z-10",
          COMPONENT_STYLES.base,
          className,
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
    type = "text",
    placeholder,
    size = "md",
    className,
    onChange,
    rounded,
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
            "group flex items-center w-full rounded-primary border transition focus-within:border-primary",
            error ? "border-error" : "border-base/10",
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
