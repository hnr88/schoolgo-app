'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { DashboardCardBoundary } from '@/modules/dashboard/components/DashboardCardBoundary';

export function ParentCardBoundary({ children }: { children: ReactNode }) {
  const t = useTranslations('ParentDashboard');

  return (
    <DashboardCardBoundary fallbackMessage={t('cardError')} retryLabel={t('retry')}>
      {children}
    </DashboardCardBoundary>
  );
}
