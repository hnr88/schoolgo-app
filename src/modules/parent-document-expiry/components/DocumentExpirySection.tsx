'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CalendarClock, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeading, SurfaceCard } from '@/modules/core';
import { DocumentExpiryRow } from '@/modules/parent-document-expiry/components/DocumentExpiryRow';
import type {
  DocumentExpirySectionProps,
  ExpiryBucketKey,
} from '@/modules/parent-document-expiry/types/document-expiry.types';

const SECTION_META: Record<
  ExpiryBucketKey,
  { titleKey: 'expiredTitle' | 'expiringTitle' | 'laterTitle'; icon: typeof CalendarClock }
> = {
  expired: { titleKey: 'expiredTitle', icon: AlertTriangle },
  expiringSoon: { titleKey: 'expiringTitle', icon: CalendarClock },
  later: { titleKey: 'laterTitle', icon: CalendarDays },
};

export function DocumentExpirySection({ bucket, items }: DocumentExpirySectionProps) {
  const t = useTranslations('ParentDocumentExpiry');
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
        <ul className='divide-y divide-border'>
          {items.map((item) => (
            <DocumentExpiryRow key={item.key} item={item} />
          ))}
        </ul>
      )}
    </SurfaceCard>
  );
}
