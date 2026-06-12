'use client';

import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface SearchTeaserOverlayProps {
  locked: boolean;
  resultCap: number;
  total: number;
  children: ReactNode;
  className?: string;
}

export function SearchTeaserOverlay({
  locked,
  resultCap,
  total,
  children,
  className,
}: SearchTeaserOverlayProps) {
  const t = useTranslations('UnifiedSearch.teaser');

  if (!locked || total <= resultCap) {
    return <>{children}</>;
  }

  const shown = Math.min(resultCap, total);

  return (
    <div className={cn('relative', className)}>
      {children}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-8">
        <div className="pointer-events-auto flex max-w-md flex-col items-center gap-3 rounded-pill bg-card px-8 py-6 text-center shadow-2">
          <Lock className="size-5 text-primary" aria-hidden="true" />
          <p className="text-body-sm font-semibold text-ink-900">{t('title')}</p>
          <p className="text-body-sm text-foggy">{t('showing', { shown, total })}</p>
          <Link
            href="/sign-in"
            className={cn(
              'inline-flex items-center rounded-pill bg-primary px-6 py-2.5 text-body-sm font-medium text-on-primary',
              'transition ease-out-quart hover:bg-primary-strong active:scale-95 motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
