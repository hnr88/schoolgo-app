'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type LockedOverlayProps = {
  locked: boolean;
  description: string;
  children: ReactNode;
  className?: string;
};

export function LockedOverlay({
  locked,
  description,
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
        inert
        aria-hidden="true"
        className="pointer-events-none select-none opacity-40"
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg px-3 py-4',
          'bg-background/95',
        )}
        aria-label={t('title')}
      >
        <Lock className="size-6 text-muted-foreground" aria-hidden="true" />
        <p className="max-w-xs text-center text-caption text-muted-foreground">
          {description}
        </p>
        <Link
          href="/sign-in"
          className={cn(
            'inline-flex items-center rounded-pill border border-primary px-3 py-1',
            'text-caption font-medium text-primary',
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
