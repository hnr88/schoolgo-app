'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  parentDeclineOfferSchema,
  type ParentDeclineOfferFormValues,
} from '@/modules/applications/schemas/parent-decline-offer.schema';
import { useParentDeclineOffer } from '@/modules/applications/queries/use-parent-decline-offer.mutation';

export function useParentDeclineOfferForm(
  applicationDocumentId: string,
  options?: { onDeclined?: () => void },
) {
  const t = useTranslations('ParentApplications');
  const declineOffer = useParentDeclineOffer(applicationDocumentId);

  const form = useForm<ParentDeclineOfferFormValues>({
    resolver: zodResolver(parentDeclineOfferSchema),
    defaultValues: { declineNote: '' },
    mode: 'onChange',
  });

  const submit = form.handleSubmit((values) => {
    declineOffer.mutate(
      { declineNote: values.declineNote },
      {
        onSuccess: () => {
          toast.success(t('declineOfferSuccess'));
          form.reset({ declineNote: '' });
          options?.onDeclined?.();
        },
        onError: () => toast.error(t('declineOfferError')),
      },
    );
  });

  return {
    form,
    isPending: declineOffer.isPending,
    submit,
  };
}
