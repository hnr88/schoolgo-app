'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { SchoolStatCardView } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolKpiCards({ cards }: { cards: SchoolStatCardView[] }) {
  const t = useTranslations('SchoolDashboard');

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-base font-bold text-ink-900'>{t('pipelineTitle')}</h2>
      <div className='grid grid-cols-2 gap-5 lg:grid-cols-4'>
        {cards.map((card) => (
          <Link
            key={card.labelKey}
            href={card.href}
            className='flex flex-col gap-1 rounded-xl border border-border bg-card px-5 py-5 no-underline shadow-1 transition-colors hover:border-primary/30'
          >
            <span className='text-xs text-foggy'>{t(card.labelKey)}</span>
            <span className='text-2xl font-bold text-ink-900'>{card.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
