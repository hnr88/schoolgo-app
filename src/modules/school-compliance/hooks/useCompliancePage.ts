'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useCoeRegister } from '@/modules/school-compliance/queries/use-coe-register.query';
import { useWatchlist } from '@/modules/school-compliance/queries/use-watchlist.query';
import { useComplianceExport } from '@/modules/school-compliance/queries/use-compliance-export.mutation';
import { downloadCsv } from '@/modules/school-compliance/lib/download-csv';
import type { CoeRegisterEntry } from '@/modules/school-compliance/types/school-compliance.types';

export type ComplianceView = 'register' | 'watchlist';

export function useCompliancePage() {
  const t = useTranslations('SchoolCompliance');
  const [view, setView] = useState<ComplianceView>('register');
  const [annotateTarget, setAnnotateTarget] = useState<CoeRegisterEntry | null>(null);

  const register = useCoeRegister();
  const watchlist = useWatchlist();
  const exportCsv = useComplianceExport();

  const active = view === 'register' ? register : watchlist;
  const entries: CoeRegisterEntry[] = active.data?.entries ?? [];

  function handleExport() {
    exportCsv.mutate(undefined, {
      onSuccess: (csv) => {
        downloadCsv(csv, 'coe-compliance-register.csv');
        toast.success(t('exportSuccess'));
      },
      onError: () => toast.error(t('exportError')),
    });
  }

  return {
    view,
    setView,
    annotateTarget,
    setAnnotateTarget,
    register,
    watchlist,
    entries,
    isLoading: active.isLoading,
    isError: active.isError,
    isEmpty: !active.isLoading && !active.isError && entries.length === 0,
    refetch: () => active.refetch(),
    handleExport,
    isExporting: exportCsv.isPending,
  };
}
