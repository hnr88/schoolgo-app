'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';

interface PerformanceBadgesProps {
  isTopPerformer: boolean;
  isLowConversion: boolean;
}

export function PerformanceBadges({ isTopPerformer, isLowConversion }: PerformanceBadgesProps) {
  const t = useTranslations('SchoolAgentPerformance');

  if (!isTopPerformer && !isLowConversion) return null;

  return (
    <span className='inline-flex items-center gap-1'>
      {isTopPerformer ? <Badge variant='secondary'>{t('badgeTopPerformer')}</Badge> : null}
      {isLowConversion ? <Badge variant='destructive'>{t('badgeLowConversion')}</Badge> : null}
    </span>
  );
}
