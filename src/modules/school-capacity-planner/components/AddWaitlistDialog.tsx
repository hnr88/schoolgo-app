'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
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
import { addWaitlistSchema } from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';
import type { AddWaitlistFormValues } from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { useAddWaitlist } from '@/modules/school-capacity-planner/queries/use-add-waitlist.mutation';

export function AddWaitlistDialog() {
  const t = useTranslations('SchoolCapacityPlanner');
  const [open, setOpen] = useState(false);
  const mutation = useAddWaitlist();
  const form = useForm<AddWaitlistFormValues>({
    resolver: zodResolver(addWaitlistSchema),
    defaultValues: { applicationDocumentId: '', intakePeriod: '', yearLevel: '' },
  });

  function onSubmit(values: AddWaitlistFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(t('addSuccess'));
        setOpen(false);
        form.reset();
      },
      onError: () => toast.error(t('addError')),
    });
  }

  return (
    <>
      <Button type='button' size='sm' onClick={() => setOpen(true)}>
        <Plus className='mr-2 h-4 w-4' />
        {t('addButton')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('addDialogTitle')}</DialogTitle>
            <DialogDescription>{t('addDialogDescription')}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='applicationDocumentId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('applicationIdLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('applicationIdPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='intakePeriod'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('intakeOptionalLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('intakePlaceholder')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='yearLevel'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('yearLevelOptionalLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('yearLevelPlaceholder')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type='submit' disabled={mutation.isPending}>
                  {t('addSubmit')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
