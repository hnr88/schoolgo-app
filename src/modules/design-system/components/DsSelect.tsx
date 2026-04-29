import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DsSelectProps } from '@/modules/design-system/types/design-system.types';

export type { DsSelectProps };

export const DsSelect = forwardRef<HTMLSelectElement, DsSelectProps>(
  function DsSelect({ error, className, children, ...props }, ref) {
    return (
      <div className='relative'>
        <select
          ref={ref}
          className={cn(
            'w-full appearance-none rounded-xl border border-border bg-white py-3 pr-10 pl-3.5 text-sm text-hof outline-none transition-colors',
            'focus:border-primary focus:ring-3 focus:ring-primary/18',
            error && 'border-primary ring-3 ring-primary/18',
            props.disabled && 'pointer-events-none opacity-50',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className='pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foggy'
          aria-hidden='true'
          strokeWidth={2}
        />
      </div>
    );
  },
);
