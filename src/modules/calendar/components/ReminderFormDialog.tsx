'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

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
import { Textarea } from '@/components/ui/textarea';
import { getReminderFormDefaults, toReminderPayload } from '@/modules/calendar/lib/reminder-form';
import { useCreateReminder } from '@/modules/calendar/queries/use-create-reminder.mutation';
import { useUpdateReminder } from '@/modules/calendar/queries/use-update-reminder.mutation';
import { reminderFormSchema } from '@/modules/calendar/schemas/reminder.schema';
import type { Reminder, ReminderFormValues } from '@/modules/calendar/types/reminder.types';

interface ReminderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: Reminder | null;
  presetDate: Date | null;
}

export function ReminderFormDialog({
  open,
  onOpenChange,
  reminder,
  presetDate,
}: ReminderFormDialogProps) {
  const t = useTranslations('Calendar');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{reminder ? t('reminderEditTitle') : t('reminderCreateTitle')}</DialogTitle>
          <DialogDescription>{t('reminderDialogDescription')}</DialogDescription>
        </DialogHeader>
        {open && (
          <ReminderForm
            key={reminder?.documentId ?? `create-${presetDate?.toISOString() ?? 'new'}`}
            reminder={reminder}
            presetDate={presetDate}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ReminderForm({
  reminder,
  presetDate,
  onDone,
}: {
  reminder: Reminder | null;
  presetDate: Date | null;
  onDone: () => void;
}) {
  const t = useTranslations('Calendar');
  const createReminder = useCreateReminder();
  const updateReminder = useUpdateReminder();
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: getReminderFormDefaults(reminder, presetDate),
  });

  function onSubmit(values: ReminderFormValues) {
    const payload = toReminderPayload(values);
    if (reminder) {
      updateReminder.mutate(
        { documentId: reminder.documentId, payload },
        { onSuccess: onDone },
      );
    } else {
      createReminder.mutate(payload, { onSuccess: onDone });
    }
  }

  const isPending = createReminder.isPending || updateReminder.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('reminderTitleLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('reminderTitlePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-3'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('reminderDateLabel')}</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('reminderTimeLabel')}</FormLabel>
                <FormControl>
                  <Input type='time' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('reminderNoteLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('reminderNotePlaceholder')}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onDone}>
            {t('cancel')}
          </Button>
          <Button type='submit' disabled={isPending}>
            {t('save')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
