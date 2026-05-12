'use client';

import { useTranslations } from 'next-intl';

interface SpecResultsPanelHeaderProps {
  count: number;
}

export function SpecResultsPanelHeader({ count }: SpecResultsPanelHeaderProps) {
  const t = useTranslations('SchoolSearch');

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-divider px-3 py-2">
      <h2 className="text-sm font-semibold text-ink-900">{t('results.title')}</h2>
      <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-caption font-semibold text-primary">
        {t('results.count', { count })}
      </span>
    </div>
  );
}
