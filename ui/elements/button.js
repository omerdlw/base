'use client';

import { memo, useCallback } from 'react';
import { COMPONENT_STYLES, SIZE_CONFIGURATIONS } from './constants';
import { CN, GET_NEXT_ROUNDED_LEVEL } from '@/lib/utils';
import IconWrapper from './icon-wrapper';

export const Button = memo(
  ({
    rounded = 'secondary',
    loading = false,
    blurry = false,
    tinted = false,
    disabled = false,
    loadingText,
    loadingIcon,
    size = 'md',
    description,
    className,
    onClick,
    color,
    text,
    icon,
    type = 'button',
    ...props
  }) => {
    const iconRounded = GET_NEXT_ROUNDED_LEVEL(rounded);
    const sizeConfig = SIZE_CONFIGURATIONS[size];

    // Determine what to display
    const displayIcon = loading ? (loadingIcon ?? icon) : icon;
    const displayText = loading ? (loadingText ?? text) : text;

    // Determine button state
    const isIconOnly = Boolean(displayIcon && !displayText);
    const isDisabled = disabled || loading;

    // Determine button size class
    const buttonSizeClass = isIconOnly
      ? sizeConfig.button.iconOnly
      : sizeConfig.button.withText;

    // Construct base classes
    const baseClasses = CN(
      COMPONENT_STYLES.base,
      buttonSizeClass,
      rounded && `rounded-${rounded}`,
      blurry ? COMPONENT_STYLES.blur.enabled : COMPONENT_STYLES.blur.disabled,
      tinted && 'hover:bg-primary hover:text-white dark:hover:text-white',
      isDisabled && COMPONENT_STYLES.shared.disabled,
      loading && 'cursor-wait',
      className,
    );

    const handleClick = useCallback(
      (e) => {
        if (!isDisabled && onClick) {
          onClick(e);
        }
      },
      [isDisabled, onClick],
    );

    // Render Icon Only Button
    if (isIconOnly) {
      return (
        <button
          className={baseClasses}
          aria-label={description || text || 'Button'}
          aria-busy={loading}
          onClick={handleClick}
          type={type}
          disabled={isDisabled}
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

    // Render Button with Text
    return (
      <button
        className={baseClasses}
        aria-label={displayText || description}
        aria-busy={loading}
        onClick={handleClick}
        type={type}
        disabled={isDisabled}
        {...props}
      >
        {(displayIcon || (loading && !displayText)) && (
          <IconWrapper
            className={CN(
              'center h-full shrink-0 transition',
              sizeConfig.icon,
              tinted
                ? 'group-hover:bg-black/10'
                : 'group-hover:bg-primary group-hover:text-white',
            )}
            rounded={iconRounded}
            loading={loading}
            color={color}
            icon={displayIcon}
          />
        )}
        {displayText && (
          <div className='flex w-full flex-col items-start -space-y-0.5 px-3'>
            <span
              className={CN(
                'text-current',
                sizeConfig.text,
                description && 'font-semibold',
              )}
            >
              {displayText}
            </span>
            {description && !loading && (
              <span className='text-xs text-current opacity-70'>
                {description}
              </span>
            )}
          </div>
        )}
      </button>
    );
  },
);
