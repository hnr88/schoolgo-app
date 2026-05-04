'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '@/modules/core/components/EmptyState';
export function ApplicationMessagesTab() {
  const t = useTranslations('Applications');

  return <EmptyState icon={MessageSquare} title={t('messagesComingSoon')} />;
}
