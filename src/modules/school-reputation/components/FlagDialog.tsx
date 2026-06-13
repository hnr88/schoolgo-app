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
import { flagSchema } from '@/modules/school-reputation/schemas/school-reputation.schema';
import { useFlagReview } from '@/modules/school-reputation/queries/use-flag-review.mutation';
import type { FlagValues } from '@/modules/school-reputation/types/school-reputation.types';

interface FlagDialogProps {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FlagDialog({ documentId, open, onOpenChange }: FlagDialogProps) {
  const t = useTranslations('SchoolReputation');
  const flag = useFlagReview(documentId);
  const form = useForm<FlagValues>({
    resolver: zodResolver(flagSchema),
    defaultValues: { reason: '' },
  });

  function onSubmit(values: FlagValues) {
    flag.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('flagTitle')}</DialogTitle>
          <DialogDescription>{t('flagDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('flagReasonLabel')}</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder={t('flagReasonPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' variant='destructive' disabled={flag.isPending}>
                {t('submitFlag')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
