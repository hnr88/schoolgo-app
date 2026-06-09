'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { EXPIRING_SOON_DAYS } from '@/modules/parent-document-expiry/lib/bucket-expiry';
import type { ExpiryCountdownBadgeProps } from '@/modules/parent-document-expiry/types/document-expiry.types';

export function ExpiryCountdownBadge({ daysUntilExpiry }: ExpiryCountdownBadgeProps) {
  const t = useTranslations('ParentDocumentExpiry');

  if (daysUntilExpiry < 0) {
    return <Badge variant='destructive'>{t('badgeExpiredAgo', { count: -daysUntilExpiry })}</Badge>;
  }

  if (daysUntilExpiry === 0) {
    return <Badge variant='destructive'>{t('badgeExpiresToday')}</Badge>;
  }

  return (
    <Badge variant={daysUntilExpiry <= EXPIRING_SOON_DAYS ? 'secondary' : 'outline'}>
      {t('badgeDaysLeft', { count: daysUntilExpiry })}
    </Badge>
  );
}
