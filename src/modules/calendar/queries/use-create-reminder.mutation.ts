'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { privateApi } from '@/lib/axios';
import { REMINDERS_QUERY_KEY } from '@/modules/calendar/queries/use-reminders.query';
import type { Reminder, ReminderPayload } from '@/modules/calendar/types/reminder.types';

export function useCreateReminder() {
  const queryClient = useQueryClient();
  const t = useTranslations('Calendar');

  return useMutation({
    mutationFn: async (payload: ReminderPayload) => {
      const { data } = await privateApi.post('/api/reminders', { data: payload });
      return data;
    },
    onMutate: async (payload: ReminderPayload) => {
      await queryClient.cancelQueries({ queryKey: REMINDERS_QUERY_KEY });
      const previous = queryClient.getQueryData<Reminder[]>(REMINDERS_QUERY_KEY) ?? [];
      const optimistic: Reminder = {
        documentId: `temp-${crypto.randomUUID()}`,
        title: payload.title,
        remindAt: payload.remindAt,
        note: payload.note,
      };
      queryClient.setQueryData<Reminder[]>(REMINDERS_QUERY_KEY, [...previous, optimistic]);
      return { previous };
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(REMINDERS_QUERY_KEY, context.previous);
      }
      toast.error(t('reminderError'));
    },
    onSuccess: () => {
      toast.success(t('reminderCreated'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: REMINDERS_QUERY_KEY });
    },
  });
}
