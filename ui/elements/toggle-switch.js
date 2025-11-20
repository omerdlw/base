'use client';

import { memo } from 'react';
import { CN, GET_NEXT_ROUNDED_LEVEL } from '@/lib/utils';
import { COMPONENT_STYLES, TOGGLE_SIZE_CLASSES } from './constants';

export const ToggleSwitch = memo(
  ({ size = 'md', className, onChange, checked, disabled, rounded, label }) => {
    const iconRounded = rounded ? GET_NEXT_ROUNDED_LEVEL(rounded) : undefined;
    const sizeConfig = TOGGLE_SIZE_CLASSES[size];

    return (
      <label
        className={CN(
          'flex cursor-pointer items-center',
          disabled && COMPONENT_STYLES.shared.disabled,
          className,
        )}
      >
        <div className='relative'>
          <input
            className='sr-only'
            onChange={onChange}
            checked={checked}
            disabled={disabled}
            type='checkbox'
            aria-checked={checked}
            aria-disabled={disabled}
          />
          <div
            className={CN(
              'rounded-full shadow-inner transition',
              checked ? 'bg-primary' : 'bg-default/10',
              rounded && `rounded-${rounded}`,
              sizeConfig.container,
            )}
          />
          <div
            className={CN(
              'absolute rounded-full bg-white shadow transition-transform',
              checked && sizeConfig.translate,
              rounded && `rounded-${iconRounded}`,
              sizeConfig.knob,
            )}
          />
        </div>
        {label && <span className='ml-3 text-sm font-medium'>{label}</span>}
      </label>
    );
  },
);
