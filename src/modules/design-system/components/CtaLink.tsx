import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { CtaLinkProps } from '@/modules/design-system/types/design-system.types';
import { ctaLinkStyles } from '../constants/design-system.constants';

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
