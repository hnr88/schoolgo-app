'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { EmptyState, ErrorState } from '@/modules/core';
import { useCompliancePage } from '@/modules/school-compliance/hooks/useCompliancePage';
import { ComplianceSummary } from '@/modules/school-compliance/components/ComplianceSummary';
import { ComplianceToolbar } from '@/modules/school-compliance/components/ComplianceToolbar';
import { ComplianceTable } from '@/modules/school-compliance/components/ComplianceTable';
import { ComplianceSkeleton } from '@/modules/school-compliance/components/ComplianceSkeleton';
import { AnnotateEventDialog } from '@/modules/school-compliance/components/AnnotateEventDialog';

export function SchoolCompliancePage() {
  const t = useTranslations('SchoolCompliance');
  const {
    view,
    setView,
    annotateTarget,
    setAnnotateTarget,
    register,
    watchlist,
    entries,
    isLoading,
    isError,
    isEmpty,
    refetch,
    handleExport,
    isExporting,
  } = useCompliancePage();

  return (
    <div className='flex flex-col gap-6'>
      <ComplianceSummary register={register.data} watchlist={watchlist.data} />

      <ComplianceToolbar
        view={view}
        onViewChange={setView}
        onExport={handleExport}
        isExporting={isExporting}
        watchlistCount={watchlist.data?.total ?? 0}
      />

      {isError ? (
        <ErrorState framed message={t('loadError')} onRetry={refetch} retryLabel={t('retry')} />
      ) : isLoading ? (
        <ComplianceSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={ShieldCheck}
          title={view === 'watchlist' ? t('emptyWatchlistTitle') : t('emptyRegisterTitle')}
          description={view === 'watchlist' ? t('emptyWatchlistDescription') : t('emptyRegisterDescription')}
        />
      ) : (
        <ComplianceTable entries={entries} onAnnotate={setAnnotateTarget} />
      )}

      <AnnotateEventDialog entry={annotateTarget} onClose={() => setAnnotateTarget(null)} />
    </div>
  );
}
