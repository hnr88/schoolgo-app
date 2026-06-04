'use client';

import { useTranslations } from 'next-intl';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmActionDialog } from '@/modules/applications/components/ConfirmActionDialog';
import { useParentDeclineOfferForm } from '@/modules/applications/hooks/useParentDeclineOfferForm';
import { PARENT_DECLINE_NOTE_MAX_LENGTH } from '@/modules/applications/constants/parent-offer.constants';
import type { ParentDeclineOfferDialogProps } from '@/modules/applications/types/parent-component.types';

export function ParentDeclineOfferDialog({
  open,
  onOpenChange,
  applicationDocumentId,
  onDeclined,
}: ParentDeclineOfferDialogProps) {
  const t = useTranslations('ParentApplications');
  const { form, isPending, submit } = useParentDeclineOfferForm(applicationDocumentId, {
    onDeclined: () => {
      onOpenChange(false);
      onDeclined?.();
    },
  });

  return (
    <ConfirmActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('declineOfferConfirmTitle')}
      description={t('declineOfferConfirmDescription')}
      confirmLabel={t('actionDeclineOffer')}
      isPending={isPending}
      onConfirm={submit}
      destructive
    >
      <Form {...form}>
        <form onSubmit={submit} className='pt-2'>
          <FormField
            control={form.control}
            name='declineNote'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('declineNoteLabel')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    maxLength={PARENT_DECLINE_NOTE_MAX_LENGTH}
                    placeholder={t('declineNotePlaceholder')}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ConfirmActionDialog>
  );
}
