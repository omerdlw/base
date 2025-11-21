"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FILTER_OPTIONS } from "./utils";
import { CONFIG } from "./constants";

export const useImageWithRetry = (
  maxRetries = CONFIG.imageRetry.maxRetries,
  src
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
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
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

export const useClickOutside = (ref, callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback, enabled]);
};

export const useSelectbox = (options, onChange, value) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(() => {
    if (isControlled) {
      return options.find((opt) => opt.value === value) || options[0] || null;
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
          prev?.value !== foundOption.value ? foundOption : prev
        );
      }
    }
  }, [value, options, isControlled]);

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
    [onChange, isControlled]
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
    [setSearchQuery]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  const filteredOptions = useMemo(
    () => FILTER_OPTIONS(options, searchQuery),
    [options, searchQuery]
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

export const useInteractiveMove = (containerRef, onMove) => {
  const onMoveRef = useRef(onMove);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  useEffect(() => {
    const handleUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
      const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

      if (onMoveRef.current) {
        onMoveRef.current(x, y);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, containerRef]);

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
      const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

      if (onMoveRef.current) {
        onMoveRef.current(x, y);
      }
    },
    [containerRef]
  );

  return { handleMouseDown, isDragging };
};
