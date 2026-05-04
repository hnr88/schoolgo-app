import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ChipProps } from '@/modules/design-system/types/design-system.types';
import { chipStyles } from '../constants/design-system.constants';

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, variant, size, leading, trailing, className, children, ...props },
  ref,
) {
  const resolvedVariant = selected ? 'selected' : (variant ?? 'default');

  return (
    <button
      ref={ref}
      type='button'
      aria-pressed={selected}
      className={cn(chipStyles({ variant: resolvedVariant, size }), className)}
      {...props}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
});
