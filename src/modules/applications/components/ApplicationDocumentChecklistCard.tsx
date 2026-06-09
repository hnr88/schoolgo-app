'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDocumentChecklist } from '@/modules/applications/queries/use-document-checklist.query';

export function ApplicationDocumentChecklistCard({
  applicationDocumentId,
}: {
  applicationDocumentId: string;
}) {
  const t = useTranslations('Applications');
  const tDocs = useTranslations('AgentDocuments');
  const { data, isLoading, isError } = useDocumentChecklist(applicationDocumentId);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3 rounded-xl border border-border bg-card p-5'>
        <Skeleton className='h-5 w-48' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='rounded-xl border border-border bg-card p-5'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('checklistTitle')}</h3>
        <p className='mt-2 text-sm text-foggy'>{t('checklistError')}</p>
      </div>
    );
  }

  const attachedCount = data.items.filter((item) => item.attached).length;

  return (
    <div className='flex flex-col gap-3 rounded-xl border border-border bg-card p-5'>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('checklistTitle')}</h3>
        {data.complete ? (
          <span className='inline-flex items-center gap-1 text-xs font-medium text-emerald-600'>
            <CheckCircle2 className='h-3.5 w-3.5' />
            {t('checklistComplete')}
          </span>
        ) : (
          <span className='text-xs font-medium text-foggy'>
            {t('checklistProgress', { attached: attachedCount, total: data.items.length })}
          </span>
        )}
      </div>

      {data.items.length === 0 ? (
        <p className='text-sm text-foggy'>{t('checklistEmpty')}</p>
      ) : (
        <ul className='flex flex-col gap-2'>
          {data.items.map((item) => (
            <li key={item.documentType} className='flex items-center gap-2 text-sm'>
              {item.attached ? (
                <CheckCircle2
                  aria-label={t('checklistAttached')}
                  className='h-4 w-4 shrink-0 text-emerald-600'
                />
              ) : (
                <XCircle
                  aria-label={t('checklistMissing')}
                  className='h-4 w-4 shrink-0 text-destructive'
                />
              )}
              <span className={item.attached ? 'text-ink-900' : 'text-foggy'}>
                {tDocs(`docType_${item.documentType}`)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
