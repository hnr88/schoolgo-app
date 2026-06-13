'use client';

import { useTranslations } from 'next-intl';

interface SpecResultsPanelHeaderProps {
  count: number;
}

export function SpecResultsPanelHeader({ count }: SpecResultsPanelHeaderProps) {
  const t = useTranslations('SchoolSearch');

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-divider px-4 py-3">
      <h2 className="text-card-title font-semibold text-ink-900">{t('results.title')}</h2>
      <span className="inline-flex h-6 items-center rounded-pill bg-rausch-50 px-2.5 text-caption font-semibold text-primary-strong">
        {t('results.count', { count })}
      </span>
    </div>
  );
}
