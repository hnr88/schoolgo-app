'use client';

import { Download, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useExportAgentData } from '@/modules/agent-settings/queries/use-export-agent-data.mutation';
import { DeleteAccountDialog } from '@/modules/agent-settings/components/DeleteAccountDialog';

export function AgentAccountSection() {
  const t = useTranslations('AgentSettings');
  const { mutate: exportData, isPending } = useExportAgentData();

  return (
    <div className='flex flex-col gap-8'>
      <section className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-sm font-medium text-ink-900'>{t('exportTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('exportDescription')}</p>
        </div>
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
      </section>

      <Separator />

      <section className='flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-sm font-medium text-destructive'>{t('dangerTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('dangerDescription')}</p>
        </div>
        <div className='self-start'>
          <DeleteAccountDialog />
        </div>
      </section>
    </div>
  );
}
