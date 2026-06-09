'use client';

import { Download, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useExportParentData } from '@/modules/parent-settings/queries/use-export-parent-data.mutation';
import { SettingsCard } from '@/modules/parent-settings/components/SettingsCard';

export function ExportDataCard() {
  const t = useTranslations('ParentSettings');
  const { mutate: exportData, isPending } = useExportParentData();

  return (
    <SettingsCard
      icon={Download}
      title={t('exportCardTitle')}
      description={t('exportCardDescription')}
    >
      <div className='flex flex-col gap-3'>
        <p className='text-sm text-muted-foreground'>{t('exportHint')}</p>
        <Button
          type='button'
          variant='outline'
          className='self-start'
          disabled={isPending}
          aria-busy={isPending}
          onClick={() => exportData()}
        >
          {isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          ) : (
            <Download className='mr-2 h-4 w-4' aria-hidden='true' />
          )}
          {t('exportButton')}
        </Button>
      </div>
    </SettingsCard>
  );
}
