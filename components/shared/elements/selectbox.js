"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import {
  COMPONENT_STYLES,
  CONFIG,
  calculateMenuPosition,
  SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS,
  SIZE_CONFIGURATIONS,
  throttle,
  useKeyboardNavigation,
  useSelectbox,
} from "./helpers";
import IconWrapper from "./icon-wrapper";

// --- Sub-components ---

const SelectboxMenu = memo(
  ({
    menuRef: externalMenuRef,
    onSearchChange,
    totalOptions,
    searchQuery,
    direction,
    menuWidth,
    onSelect,
    options,
    rounded = "secondary",
    triggerRef,
    blurry,
    size,
    focusedIndex,
  }) => {
    const showSearch = totalOptions >= CONFIG.menu.searchThreshold;
    const nextRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const internalMenuRef = useRef(null);
    const menuRef = externalMenuRef || internalMenuRef;
    const sizeConfig = SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS[size];
    const focusedItemRef = useRef(null);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    const handleSearchChange = useCallback(
      (e) => {
        onSearchChange(e.target.value);
      },
      [onSearchChange]
    );

    const updatePosition = useCallback(() => {
      if (!triggerRef?.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current?.getBoundingClientRect();
      const newPosition = calculateMenuPosition(
        triggerRect,
        menuRect,
        direction,
        menuWidth
      );
      setPosition(newPosition);
    }, [triggerRef, direction, menuWidth, menuRef]);

    const throttledUpdatePosition = useMemo(
      () => throttle(updatePosition, 16),
      [updatePosition]
    );

    useEffect(() => {
      if (!triggerRef?.current) return;

      updatePosition();
      const timeoutId = setTimeout(updatePosition, 0);

      window.addEventListener("scroll", throttledUpdatePosition, true);
      window.addEventListener("resize", throttledUpdatePosition);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", throttledUpdatePosition, true);
        window.removeEventListener("resize", throttledUpdatePosition);
      };
    }, [triggerRef, throttledUpdatePosition, updatePosition]);

    useEffect(() => {
      if (focusedIndex >= 0 && focusedItemRef.current) {
        focusedItemRef.current.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }, [focusedIndex]);

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
            : COMPONENT_STYLES.blur.disabled
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: position.width ? `${position.width}px` : "auto",
        }}
        role="listbox"
        aria-label="Options"
      >
        {showSearch && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={CN(
              "p-2.5 transition-colors bg-base/5",
              nextRounded === "primary" && "rounded-t-primary",
              nextRounded === "secondary" && "rounded-t-secondary",
              nextRounded === "tertiary" && "rounded-t-tertiary"
            )}
          >
            <input
              className={CN(
                "w-full bg-transparent outline-none",
                sizeConfig.text
              )}
              placeholder="Search in options"
              onChange={handleSearchChange}
              value={searchQuery}
              type="text"
              autoFocus
              aria-label="Search options"
            />
          </div>
        )}
        <div
          className={CN(
            CONFIG.menu.maxHeight +
              " overflow-x-hidden overflow-y-auto space-y-0.5",
            rounded && `rounded-b-${nextRounded}`,
            showSearch && "mt-0.5"
          )}
        >
          {options.length === 0 ? (
            <div
              className={CN(
                "p-2.5 cursor-not-allowed transition-colors bg-base/5",
                sizeConfig.text,
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
                  : "rounded-tertiary"
              )}
            >
              <span className="opacity-75 text-sm">No options found</span>
            </div>
          ) : (
            options.map((option, index) => {
              const {
                icon,
                description,
                label,
                value: optionValue,
                disabled,
              } = option;

              const isFocused = index === focusedIndex;

              return (
                <div
                  key={optionValue}
                  ref={isFocused ? focusedItemRef : null}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!disabled) {
                      onSelect?.(option);
                    }
                  }}
                  role="option"
                  aria-selected={isFocused}
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  className={CN(
                    COMPONENT_STYLES.base,
                    sizeConfig.button.withText,
                    getOptionRoundedClass(index, options.length),
                    "!border-transparent !bg-base/5 hover:!bg-white/60 dark:hover:!bg-black/40",
                    isFocused && "!bg-primary/10 !border-primary",
                    disabled && COMPONENT_STYLES.shared.disabled
                  )}
                >
                  {icon && (
                    <IconWrapper
                      className={CN(
                        "group-hover:bg-primary group-hover:text-white bg-base/5",
                        "center h-full shrink-0 transition",
                        "!rounded-quaternary",
                        sizeConfig.icon
                      )}
                      icon={icon}
                    />
                  )}
                  <div className="flex flex-col justify-center items-start -space-y-0.5 px-3 w-full">
                    <div
                      className={CN(
                        "w-full bg-transparent outline-none appearance-none",
                        description && "font-semibold",
                        sizeConfig.text
                      )}
                    >
                      {label}
                    </div>
                    {description && (
                      <span className="text-xs opacity-75">{description}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );

    if (typeof window === "undefined" || !mounted) return null;

    return createPortal(menuContent, document.body);
  }
);

SelectboxMenu.displayName = "SelectboxMenu";

const SelectboxValue = memo(
  ({
    selectedOption,
    textClassName,
    iconClassName,
    description,
    placeholder,
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
              iconClassName
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={icon}
          />
        )}
        <div className="flex flex-col justify-center items-start -space-y-0.5 px-3 w-full">
          <div
            className={CN(
              "w-full bg-transparent outline-none appearance-none",
              description && "font-semibold",
              !selectedOption && "opacity-50",
              textClassName
            )}
          >
            {selectedOption?.label || text || placeholder || "Select an option"}
          </div>
          {description && (
            <span className="text-xs opacity-75">{description}</span>
          )}
        </div>
      </>
    );
  }
);

SelectboxValue.displayName = "SelectboxValue";

// --- Main Component ---

export const Selectbox = memo(
  ({
    rounded = "secondary",
    direction = "top",
    loading = false,
    blurry = false,
    disabled = false,
    options = [],
    description,
    placeholder,
    size = "md",
    className,
    menuWidth,
    onChange,
    color,
    value,
    text,
    icon,
    ...props
  }) => {
    const {
      filteredOptions,
      selectedOption,
      setSearchQuery,
      handleSelect,
      searchQuery,
      toggleMenu,
      closeMenu,
      selectRef,
      menuRef,
      isOpen,
    } = useSelectbox(options, onChange, value);

    const { focusedIndex } = useKeyboardNavigation(
      filteredOptions,
      isOpen,
      handleSelect,
      closeMenu
    );

    const sizeConfig = SIZE_CONFIGURATIONS[size];

    const handleToggle = useCallback(
      (e) => {
        if (!disabled) {
          toggleMenu(e);
        }
      },
      [disabled, toggleMenu]
    );

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
          disabled && COMPONENT_STYLES.shared.disabled
        )}
        aria-label={text || description || "Select option"}
        onClick={handleToggle}
        ref={selectRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-controls={isOpen ? "selectbox-menu" : undefined}
        {...props}
      >
        <SelectboxValue
          selectedOption={selectedOption}
          iconClassName={sizeConfig.icon}
          textClassName={sizeConfig.text}
          description={description}
          placeholder={placeholder}
          rounded={rounded}
          loading={loading}
          isOpen={isOpen}
          color={color}
          icon={selectedOption?.icon || icon}
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
            size={size}
            focusedIndex={focusedIndex}
          />
        )}
      </div>
    );
  }
);

Selectbox.displayName = "Selectbox";
