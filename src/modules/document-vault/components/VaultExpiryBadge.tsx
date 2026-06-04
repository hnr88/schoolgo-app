'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  VAULT_EXPIRY_BADGE_CLASS,
  VAULT_EXPIRY_BADGE_LABEL_KEY,
} from '@/modules/document-vault/constants/document-vault.constants';
import type { VaultExpiryBadgeProps } from '@/modules/document-vault/types/document-vault.types';

export function VaultExpiryBadge({ status }: VaultExpiryBadgeProps) {
  const t = useTranslations('DocumentVault');

  if (status === 'none' || status === 'valid') return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        VAULT_EXPIRY_BADGE_CLASS[status],
      )}
    >
      <CalendarClock className='h-3 w-3' />
      {t(VAULT_EXPIRY_BADGE_LABEL_KEY[status])}
    </span>
  );
}
