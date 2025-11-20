'use client';

import { memo } from 'react';
import { CN } from '@/lib/utils';
import { TOOLTIP_POSITION_CLASSES } from './constants';

export const Tooltip = memo(
  ({
    rounded = 'primary',
    position = 'top',
    className,
    disabled,
    children,
    content,
  }) => {
    return (
      <div className={CN('group relative flex items-center', className)}>
        {children}
        {!disabled && content && (
          <div
            className={CN(
              'pointer-events-none opacity-0 transition-opacity group-hover:opacity-100',
              'border-default/10 border bg-black/40 backdrop-blur-xl',
              'absolute z-50 rounded-md px-3 py-2 text-sm whitespace-nowrap',
              TOOLTIP_POSITION_CLASSES[position],
              rounded && `rounded-${rounded}`,
            )}
            role='tooltip'
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);
