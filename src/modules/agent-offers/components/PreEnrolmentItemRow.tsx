'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAgentSubmitPreEnrolment } from '@/modules/applications/queries/use-agent-submit-pre-enrolment.mutation';
import {
  PRE_ENROLMENT_ITEM_LABEL_KEY,
  PRE_ENROLMENT_STATUS_BADGE,
} from '@/modules/applications/constants/parent-pre-enrolment.constants';
import type { ParentPreEnrolmentItem } from '@/modules/applications/types/parent-pre-enrolment.types';

interface PreEnrolmentItemRowProps {
  item: ParentPreEnrolmentItem;
  applicationDocumentId: string;
}

export function PreEnrolmentItemRow({ item, applicationDocumentId }: PreEnrolmentItemRowProps) {
  const t = useTranslations('AgentOffers');
  const submit = useAgentSubmitPreEnrolment(applicationDocumentId);

  const label =
    item.itemType === 'custom' && item.customLabel
      ? item.customLabel
      : t(PRE_ENROLMENT_ITEM_LABEL_KEY[item.itemType]);

  const canSubmit = item.status === 'pending' || item.status === 'rejected';

  function handleSubmit() {
    submit.mutate(item.documentId, {
      onSuccess: () => toast.success(t('markSubmittedSuccess')),
      onError: () => toast.error(t('markSubmittedError')),
    });
  }

  return (
    <div className='flex flex-col gap-2 border-b border-border/50 py-3 last:border-b-0'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm text-ink-900'>{label}</span>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
            PRE_ENROLMENT_STATUS_BADGE[item.status],
          )}
        >
          {t(`itemStatus_${item.status}`)}
        </span>
      </div>
      {item.note && <span className='text-xs text-foggy'>{item.note}</span>}
      {canSubmit && (
        <div className='flex justify-end'>
          <Button size='sm' variant='outline' onClick={handleSubmit} disabled={submit.isPending}>
            {submit.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('markSubmitted')}
          </Button>
        </div>
      )}
    </div>
  );
}
