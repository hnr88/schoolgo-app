'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ExpiryCountdownBadge } from '@/modules/parent-document-expiry/components/ExpiryCountdownBadge';
import type { DocumentExpiryRowProps } from '@/modules/parent-document-expiry/types/document-expiry.types';

export function DocumentExpiryRow({ item }: DocumentExpiryRowProps) {
  const t = useTranslations('ParentDocumentExpiry');
  const tVault = useTranslations('DocumentVault');
  const tStudents = useTranslations('Students');
  const format = useFormatter();

  const typeLabel =
    item.source === 'vault'
      ? tVault(`docType_${item.documentType}`)
      : tStudents(`docType_${item.documentType}`);
  const ownerLabel = item.source === 'vault' ? t('sourceVault') : item.ownerName;

  return (
    <li className='flex flex-wrap items-center justify-between gap-3 py-3'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <span className='truncate text-sm font-medium text-ink-900'>{item.title ?? typeLabel}</span>
        <span className='truncate text-xs text-foggy'>
          {typeLabel}
          {ownerLabel ? ` · ${ownerLabel}` : ''}
        </span>
      </div>
      <div className='flex shrink-0 items-center gap-3'>
        <span className='text-xs text-foggy'>
          {t(item.daysUntilExpiry < 0 ? 'expiredOn' : 'expiresOn', {
            date: format.dateTime(new Date(item.expiresAt), { dateStyle: 'medium' }),
          })}
        </span>
        <ExpiryCountdownBadge daysUntilExpiry={item.daysUntilExpiry} />
        <Link
          href={item.href}
          className='inline-flex items-center gap-1 text-sm font-medium text-primary-strong hover:underline'
        >
          {t('viewLink')}
          <ArrowRight className='h-3.5 w-3.5' aria-hidden='true' />
        </Link>
      </div>
    </li>
  );
}
