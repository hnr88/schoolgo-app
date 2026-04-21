import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, leading, trailing, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type='button'
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-3 h-9 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        selected
          ? 'border-primary bg-primary text-on-primary shadow-brand'
          : 'border-border bg-card text-foreground hover:bg-muted',
        className,
      )}
      {...props}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
});
