'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type LockedOverlayProps = {
  locked: boolean;
  description: string;
  signUpHref: string;
  children: ReactNode;
  className?: string;
};

export function LockedOverlay({
  locked,
  description,
  signUpHref,
  children,
  className,
}: LockedOverlayProps) {
  const t = useTranslations('SchoolSearch.filters.locked');

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none opacity-40"
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg',
          'bg-background/80 backdrop-blur-sm',
        )}
        aria-label={t('title')}
      >
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          {description}
        </p>
        <Link
          href={signUpHref}
          className={cn(
            'inline-flex items-center rounded-pill border border-primary px-4 py-1.5',
            'text-sm font-medium text-primary',
            'transition-colors hover:bg-primary hover:text-primary-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          )}
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
