import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-brand hover:bg-rausch-600 active:bg-rausch-700 active:translate-y-px active:shadow-none',
        secondary:
          'border border-border bg-white text-hof hover:bg-muted active:border-quill',
        tertiary:
          'bg-transparent text-hof underline underline-offset-4 decoration-border hover:decoration-hof',
        dark:
          'bg-ink-900 text-white hover:bg-ink-900/90 active:bg-ink-900/80',
        trust:
          'bg-babu-500 text-on-primary hover:bg-babu-600 active:bg-babu-700',
        featured:
          'bg-arches-500 text-on-primary hover:bg-arches-600 active:bg-arches-700',
        link: 'px-0 bg-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-[13px]',
        md: 'px-4.5 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface DsButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: ReactNode;
}

export const DsButton = forwardRef<HTMLButtonElement, DsButtonProps>(
  function DsButton({ variant, size, className, children, ...props }, ref) {
    return (
      <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  },
);
