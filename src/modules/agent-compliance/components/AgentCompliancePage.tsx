'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useComplianceTracker } from '@/modules/agent-compliance/hooks/useComplianceTracker';
import { ComplianceSkeleton } from '@/modules/agent-compliance/components/ComplianceSkeleton';
import { ComplianceSummaryHeader } from '@/modules/agent-compliance/components/ComplianceSummaryHeader';
import { ComplianceTable } from '@/modules/agent-compliance/components/ComplianceTable';

export function AgentCompliancePage() {
  const t = useTranslations('AgentCompliance');
  const { rows, summary, isLoading, isError, isEmpty, retry } = useComplianceTracker();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={ShieldCheck}
        title={t('title')}
        description={t('subtitle')}
      />

      {isError ? (
        <ErrorState framed message={t('errorMessage')} onRetry={retry} retryLabel={t('retry')} />
      ) : isLoading ? (
        <ComplianceSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={ShieldCheck}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/dashboard/students' className={buttonVariants()}>
              {t('emptyCta')}
            </Link>
          }
        />
      ) : (
        <>
          <ComplianceSummaryHeader summary={summary} />
          <ComplianceTable rows={rows} />
        </>
      )}
    </div>
  );
}
