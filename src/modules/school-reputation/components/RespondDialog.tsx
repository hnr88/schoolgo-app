'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { respondSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import { useRespondReview } from '@/modules/school-reputation/queries/use-respond-review.mutation';
import type { RespondValues } from '@/modules/school-reputation/types/school-reputation.types';

interface RespondDialogProps {
  documentId: string;
  existingBody: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RespondDialog({ documentId, existingBody, open, onOpenChange }: RespondDialogProps) {
  const t = useTranslations('SchoolReputation');
  const respond = useRespondReview(documentId);
  const form = useForm<RespondValues>({
    resolver: zodResolver(respondSchema),
    defaultValues: { body: existingBody ?? '' },
  });

  function onSubmit(values: RespondValues) {
    respond.mutate(values, { onSuccess: () => onOpenChange(false) });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{existingBody ? t('editResponseTitle') : t('respondTitle')}</DialogTitle>
          <DialogDescription>{t('respondDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('responseLabel')}</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder={t('responsePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={respond.isPending}>
                {t('publishResponse')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
