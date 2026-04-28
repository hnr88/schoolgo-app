import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipStyles = cva(
  'inline-flex items-center gap-1.5 rounded-pill text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  {
    variants: {
      variant: {
        default: 'border border-border bg-card text-hof hover:bg-muted',
        selected: 'border border-primary bg-primary text-on-primary shadow-brand',
        soft: 'border border-transparent bg-muted text-hof',
      },
      size: {
        sm: 'px-2.5 py-1',
        md: 'px-3.5 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipStyles> {
  selected?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

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
