'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { promoteWaitlistSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type {
  PromoteWaitlistFormValues,
  WaitlistEntry,
} from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { usePromoteWaitlist } from '@/modules/school-capacity-planner/queries/use-promote-waitlist.mutation';

interface PromoteWaitlistDialogProps {
  entry: WaitlistEntry | null;
  onClose: () => void;
}

export function PromoteWaitlistDialog({ entry, onClose }: PromoteWaitlistDialogProps) {
  const t = useTranslations('SchoolCapacityPlanner');
  const mutation = usePromoteWaitlist();
  const form = useForm<PromoteWaitlistFormValues>({
    resolver: zodResolver(promoteWaitlistSchema),
    defaultValues: { offerDeadline: '' },
  });

  useEffect(() => {
    if (entry) form.reset({ offerDeadline: '' });
  }, [entry, form]);

  if (!entry) return null;

  function onSubmit(values: PromoteWaitlistFormValues) {
    if (!entry) return;
    mutation.mutate(
      { documentId: entry.documentId, ...values },
      {
        onSuccess: () => {
          toast.success(t('promoteSuccess'));
          onClose();
        },
        onError: () => toast.error(t('promoteError')),
      },
    );
  }

  return (
    <Dialog open onOpenChange={(next) => !next && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('promoteDialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('promoteDialogDescription', { name: entry.application?.student?.name ?? '' })}
          </DialogDescription>
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
            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={mutation.isPending}>
                {t('promoteSubmit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
