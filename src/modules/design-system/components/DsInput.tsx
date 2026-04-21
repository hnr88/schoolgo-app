import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface DsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

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
