import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { DsInputProps } from '@/modules/design-system/types/design-system.types';

export type { DsInputProps };

export const DsInput = forwardRef<HTMLInputElement, DsInputProps>(
  function DsInput({ error, className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-hof outline-none transition-colors placeholder:text-quill',
          'focus:border-primary focus:ring-3 focus:ring-primary/18',
          error && 'border-primary ring-3 ring-primary/18',
          props.disabled && 'pointer-events-none opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);
