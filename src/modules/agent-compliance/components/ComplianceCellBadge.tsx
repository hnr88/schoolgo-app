'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import type { ComplianceCellBadgeProps } from '@/modules/agent-compliance/types/agent-compliance.types';

export function ComplianceCellBadge({ cell }: ComplianceCellBadgeProps) {
  const t = useTranslations('AgentCompliance');
  const format = useFormatter();

  if (cell.state === 'missing') {
    return <Badge variant='destructive'>{t('chipMissing')}</Badge>;
  }

  if (cell.expiresAt == null) {
    return <Badge variant='outline'>{t('chipNoExpiry')}</Badge>;
  }

  const days = cell.daysLeft ?? 0;

  return (
    <span className='inline-flex flex-col items-start gap-0.5'>
      {cell.state === 'expired' ? (
        <Badge variant='destructive'>{t('chipExpiredAgo', { count: -days })}</Badge>
      ) : cell.state === 'expiring' ? (
        <Badge variant='secondary'>
          {days === 0 ? t('chipExpiresToday') : t('chipDaysLeft', { count: days })}
        </Badge>
      ) : (
        <Badge variant='outline'>{t('chipOk')}</Badge>
      )}
      <span className='text-xs text-foggy'>
        {format.dateTime(new Date(cell.expiresAt), { dateStyle: 'medium' })}
      </span>
    </span>
  );
}
