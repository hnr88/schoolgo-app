import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const ctaLinkStyles = cva(
  'inline-flex items-center gap-2 rounded-pill font-semibold no-underline',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary shadow-brand hover:bg-rausch-600 active:bg-rausch-700',
        secondary:
          'border border-border bg-white text-hof hover:bg-muted',
        dark:
          'bg-ink-900 text-white hover:bg-ink-900/90 active:bg-ink-900/80',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-[13px]',
        md: 'px-4.5 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base',
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
      data-slot='button'
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
