'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import { InterviewCard } from '@/modules/parent-interviews/components/InterviewCard';
import type { InterviewItem } from '@/modules/parent-interviews/types/parent-interviews.types';

interface InterviewSectionProps {
  bucket: 'upcoming' | 'past';
  items: InterviewItem[];
}

const SECTION_META = {
  upcoming: { titleKey: 'upcomingTitle', icon: CalendarClock },
  past: { titleKey: 'pastTitle', icon: History },
} as const;

export function InterviewSection({ bucket, items }: InterviewSectionProps) {
  const t = useTranslations('ParentInterviews');
  const meta = SECTION_META[bucket];

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <SectionHeading
        level={2}
        icon={meta.icon}
        title={t(meta.titleKey)}
        actions={<Badge variant='outline'>{items.length}</Badge>}
      />
      {items.length === 0 ? (
        <p className='text-sm text-foggy'>{t('sectionEmpty')}</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {items.map((item) => (
            <InterviewCard key={item.applicationDocumentId} item={item} bucket={bucket} />
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
