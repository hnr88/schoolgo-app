'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { formatAud } from '@/modules/school-search/lib/format-currency';

interface SchoolCardFooterProps {
  tuition: number | null | undefined;
}

export function SchoolCardFooter({ tuition }: SchoolCardFooterProps) {
  const t = useTranslations('SchoolSearch.spec.tileCard');

  return (
    <div className="flex items-center justify-between">
      <span className="text-body-sm font-semibold text-ink-900">
        {tuition != null
          ? t('tuitionFrom', { amount: formatAud(tuition).replace('A$', '$') })
          : ''}
      </span>
      <span className="inline-flex items-center gap-1 text-caption font-medium text-primary group-hover:underline">
        {t('viewSchool')}
        <ArrowRight size={12} aria-hidden />
      </span>
    </div>
  );
}
