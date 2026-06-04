'use client';

import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeading, StatTile } from '@/modules/core';
import { SCHOOL_KPI_STYLE } from '@/modules/school-dashboard/constants/school-dashboard.constants';
import type { SchoolStatCardView } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolKpiCards({ cards }: { cards: SchoolStatCardView[] }) {
  const t = useTranslations('SchoolDashboard');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('pipelineTitle')} level={2} />
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {cards.map((card) => {
          const style = SCHOOL_KPI_STYLE[card.labelKey];
          const Icon = style?.icon ?? FileText;
          const label = t(card.labelKey);
          return (
            <StatTile
              key={card.labelKey}
              icon={Icon}
              iconClassName={style ? `${style.bg} ${style.iconColor}` : undefined}
              label={label}
              value={card.count}
              href={card.href}
            />
          );
        })}
      </div>
    </section>
  );
}
