"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { useKeyboardNavigation, useSelectbox } from "./hooks";
import { CN, GET_NEXT_ROUNDED_LEVEL } from "@/lib/utils";
import IconWrapper from "./icon-wrapper";
import {
  SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS,
  SIZE_CONFIGURATIONS,
  COMPONENT_STYLES,
  CONFIG,
} from "./constants";
import {
  GET_OPTION_ROUNDED_CLASS,
  CALCULATE_MENU_POSITION,
  GET_ROUNDED_CLASS,
  THROTTLE,
} from "./utils";
import { useMenuAnimation, useMenuOptionsAnimation } from "./use-animations";

const SelectboxOption = memo(
  ({
    option,
    index,
    totalCount,
    isFocused,
    isSelected,
    onSelect,
    sizeConfig,
    rounded,
    showSearch,
    focusedItemRef,
  }) => {
    const { icon, description, label, value, disabled } = option;

    const handleClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          onSelect?.(option);
        }
      },
      [disabled, onSelect, option]
    );

    return (
      <div
        key={value}
        ref={isFocused ? focusedItemRef : null}
        onClick={handleClick}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={CN(
          "flex cursor-pointer items-center p-1 transition",
          "bg-black/40",
          "border border-transparent",
          GET_OPTION_ROUNDED_CLASS(index, totalCount, rounded, showSearch),
          sizeConfig.button.withText,
          "hover:bg-default/10 dark:hover:bg-default/10",
          isSelected && "bg-primary/50!",
          isFocused && "border-primary! bg-primary/10!",
          disabled && COMPONENT_STYLES.shared.disabled
        )}
      >
        {icon && (
          <IconWrapper
            className={CN(
              "center bg-default/5 h-full shrink-0 transition",
              "rounded-quaternary",
              sizeConfig.icon
            )}
            icon={icon}
          />
        )}
        <div className="flex w-full flex-col items-start justify-center -space-y-0.5 px-1.5">
          <div
            className={CN(
              "w-full appearance-none bg-transparent outline-none",
              description && "font-semibold",
              sizeConfig.text
            )}
          >
            {label}
          </div>
          {description && (
            <span className="text-xs opacity-70">{description}</span>
          )}
        </div>
      </div>
    );
  }
);

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
    noGlass,
    size,
    focusedIndex,
    selectedOption,
    isOpen,
    onAnimationComplete,
  }) => {
    const showSearch = totalOptions >= CONFIG.menu.searchThreshold;
    const nextRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [mounted, setMounted] = useState(false);
    const internalMenuRef = useRef(null);
    const menuRef = externalMenuRef || internalMenuRef;
    const sizeConfig = SELECTBOX_MENU_ITEM_SIZE_CONFIGURATIONS[size];
    const focusedItemRef = useRef(null);

    // Animation hook
    useMenuAnimation(menuRef, isOpen, onAnimationComplete);

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
      const newPosition = CALCULATE_MENU_POSITION(
        triggerRect,
        menuRect,
        direction,
        menuWidth,
        0
      );
      setPosition(newPosition);
    }, [triggerRef, direction, menuWidth, menuRef]);

    const throttledUpdatePosition = useMemo(
      () => THROTTLE(updatePosition, 16),
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
    }, [triggerRef, throttledUpdatePosition, updatePosition, mounted]);

    useEffect(() => {
      if (focusedIndex >= 0 && focusedItemRef.current) {
        focusedItemRef.current.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }, [focusedIndex]);

    const optionsContainerRef = useRef(null);
    useMenuOptionsAnimation(optionsContainerRef, true);

    const menuContent = (
      <div
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: position.width ? `${position.width}px` : "auto",
          transform: position.transform,
          zIndex: 100,
        }}
      >
        <div
          ref={menuRef}
          className={CN(
            "border-default/10 bg-default/5 overflow-hidden border p-1 backdrop-blur-xl",
            rounded && `rounded-${rounded}`,
            !noGlass
              ? COMPONENT_STYLES.blur.enabled
              : COMPONENT_STYLES.blur.disabled
          )}
          role="listbox"
          aria-label="Options"
        >
          {showSearch && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={CN(
                "p-2.5 transition-colors bg-black/40",
                "hover:bg-default/5 focus:bg-default/5",
                GET_ROUNDED_CLASS(nextRounded, "top")
              )}
            >
              <input
                className={CN("w-full bg-transparent outline-none")}
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
            ref={optionsContainerRef}
            className={CN(
              CONFIG.menu.maxHeight +
                " space-y-0.5 overflow-x-hidden overflow-y-auto",
              rounded && `rounded-b-${nextRounded}`,
              showSearch && "mt-0.5"
            )}
          >
            {options.length === 0 ? (
              <div
                className={CN(
                  "cursor-not-allowed bg-black/40 p-2.5 transition-colors",
                  sizeConfig.text,
                  showSearch
                    ? GET_ROUNDED_CLASS(nextRounded, "bottom")
                    : GET_ROUNDED_CLASS(nextRounded, "full")
                )}
              >
                <span className="text-sm opacity-70">No options found</span>
              </div>
            ) : (
              options.map((option, index) => {
                const isFocused = index === focusedIndex;
                const isSelected = selectedOption?.value === option.value;

                return (
                  <SelectboxOption
                    key={option.value}
                    option={option}
                    index={index}
                    totalCount={options.length}
                    isFocused={isFocused}
                    isSelected={isSelected}
                    onSelect={onSelect}
                    sizeConfig={sizeConfig}
                    rounded={nextRounded}
                    showSearch={showSearch}
                    focusedItemRef={focusedItemRef}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    );

    if (typeof window === "undefined" || !mounted) return null;

    return createPortal(menuContent, document.body);
  }
);

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
                : "bg-default/5 group-hover:bg-primary transition group-hover:text-white",
              "center h-full shrink-0",
              iconClassName
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={icon}
          />
        )}
        <div className="flex w-full flex-col items-start justify-center -space-y-0.5 px-3">
          <div
            className={CN(
              "w-full appearance-none bg-transparent outline-none",
              description && "font-semibold",
              !selectedOption && "opacity-50",
              textClassName
            )}
          >
            {selectedOption?.label || text || placeholder || "Select an option"}
          </div>
          {description && (
            <span className="text-xs opacity-70">{description}</span>
          )}
        </div>
      </>
    );
  }
);

export const Selectbox = memo(
  forwardRef(
    (
      {
        rounded = "secondary",
        direction = "top",
        loading = false,
        noGlass = false,
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
      },
      ref
    ) => {
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

      // Merge refs (internal selectRef and external ref)
      useEffect(() => {
        if (ref) {
          if (typeof ref === "function") {
            ref(selectRef.current);
          } else {
            ref.current = selectRef.current;
          }
        }
      }, [ref, selectRef]);

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

      const [renderMenu, setRenderMenu] = useState(isOpen);

      useEffect(() => {
        if (isOpen) setRenderMenu(true);
      }, [isOpen]);

      const handleAnimationComplete = useCallback(() => {
        if (!isOpen) setRenderMenu(false);
      }, [isOpen]);

      return (
        <div
          className={CN(
            COMPONENT_STYLES.base,
            rounded && `rounded-${rounded}`,
            sizeConfig.button.withText,
            "relative cursor-pointer",
            isOpen ? "z-20" : "z-10",
            !noGlass
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
          {renderMenu && (
            <SelectboxMenu
              isOpen={isOpen}
              onAnimationComplete={handleAnimationComplete}
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
              noGlass={noGlass}
              size={size}
              focusedIndex={focusedIndex}
              selectedOption={selectedOption}
            />
          )}
        </div>
      );
    }
  )
);

Selectbox.displayName = "Selectbox";
