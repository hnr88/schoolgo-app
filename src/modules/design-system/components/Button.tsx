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
          'border border-border bg-card text-foreground hover:bg-muted active:border-quill',
        tertiary:
          'bg-transparent text-foreground hover:bg-muted',
        trust:
          'bg-babu-500 text-on-primary hover:bg-babu-600 active:bg-babu-700',
        featured:
          'bg-arches-500 text-on-primary hover:bg-arches-600 active:bg-arches-700',
        link: 'px-0 bg-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10 p-0',
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
