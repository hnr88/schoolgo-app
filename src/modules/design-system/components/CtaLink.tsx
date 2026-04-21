import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const ctaLinkStyles = cva(
  'inline-flex items-center gap-2 rounded-pill font-semibold no-underline transition-colors',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-brand hover:bg-rausch-600 active:bg-rausch-700',
        secondary:
          'border border-border bg-card text-foreground hover:bg-muted',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-7 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface CtaLinkProps extends VariantProps<typeof ctaLinkStyles> {
  href: string;
  arrow?: boolean;
  justify?: boolean;
  children: ReactNode;
  className?: string;
}

export function CtaLink({
  href,
  variant,
  size,
  arrow,
  justify,
  children,
  className,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        ctaLinkStyles({ variant, size }),
        justify && 'justify-center',
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
      )}
    </Link>
  );
}
