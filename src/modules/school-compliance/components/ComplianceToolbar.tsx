'use client';

import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import type { ComplianceView } from '@/modules/school-compliance/hooks/useCompliancePage';

interface Props {
  view: ComplianceView;
  onViewChange: (view: ComplianceView) => void;
  onExport: () => void;
  isExporting: boolean;
  watchlistCount: number;
}

export function ComplianceToolbar({ view, onViewChange, onExport, isExporting, watchlistCount }: Props) {
  const t = useTranslations('SchoolCompliance');

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <Tabs value={view} onValueChange={(v) => onViewChange(v === 'watchlist' ? 'watchlist' : 'register')}>
        <TabsList>
          <TabsTrigger value='register' className='text-foreground/80'>
            {t('tabRegister')}
          </TabsTrigger>
          <TabsTrigger value='watchlist' className='text-foreground/80'>
            {t('tabWatchlist', { count: watchlistCount })}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant='outline' className='gap-2' onClick={onExport} disabled={isExporting}>
        <Download className='h-4 w-4' />
        {t('exportCsv')}
      </Button>
    </div>
  );
}
