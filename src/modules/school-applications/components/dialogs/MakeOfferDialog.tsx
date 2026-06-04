'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { makeOfferSchema, type MakeOfferForm } from '@/modules/school-applications/schemas/school-actions.schema';
import { useSchoolApplicationAction } from '@/modules/school-applications/queries/use-school-application-action.mutation';

interface Props {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'make-offer' | 'extend-offer';
}

export function MakeOfferDialog({ documentId, open, onOpenChange, mode }: Props) {
  const t = useTranslations('SchoolApplications');
  const action = useSchoolApplicationAction(documentId, mode);
  const form = useForm<MakeOfferForm>({
    resolver: zodResolver(makeOfferSchema),
    defaultValues: { offerDeadline: '', offerConditions: '', offerAnnualFee: '' },
  });

  function onSubmit(values: MakeOfferForm) {
    const payload: Record<string, unknown> = { offerDeadline: values.offerDeadline };
    if (mode === 'make-offer') {
      if (values.offerConditions) payload.offerConditions = values.offerConditions;
      const fee = values.offerAnnualFee?.trim();
      if (fee) payload.offerAnnualFee = Number(fee);
    }
    action.mutate(payload, {
      onSuccess: () => {
        toast.success(t('actionSuccess'));
        onOpenChange(false);
        form.reset();
      },
      onError: () => toast.error(t('actionError')),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{mode === 'make-offer' ? t('actionMakeOffer') : t('actionExtendOffer')}</DialogTitle>
          <DialogDescription>{t('offerDialogDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='offerDeadline'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('offerDeadlineLabel')}</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'make-offer' && (
              <>
                <FormField
                  control={form.control}
                  name='offerAnnualFee'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('offerAnnualFeeLabel')}</FormLabel>
                      <FormControl>
                        <Input type='number' min='0' step='0.01' {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='offerConditions'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('offerConditionsLabel')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('confirmCancel')}
              </Button>
              <Button type='submit' disabled={action.isPending}>
                {t('confirmConfirm')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
