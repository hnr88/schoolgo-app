'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { privateApi } from '@/lib/axios';
import { REMINDERS_QUERY_KEY } from '@/modules/calendar/queries/use-reminders.query';
import type { Reminder, ReminderPayload } from '@/modules/calendar/types/reminder.types';

interface UpdateReminderInput {
  documentId: string;
  payload: ReminderPayload;
}

export function useUpdateReminder() {
  const queryClient = useQueryClient();
  const t = useTranslations('Calendar');

  return useMutation({
    mutationFn: async ({ documentId, payload }: UpdateReminderInput) => {
      const { data } = await privateApi.put(`/api/reminders/${documentId}`, { data: payload });
      return data;
    },
    onMutate: async ({ documentId, payload }: UpdateReminderInput) => {
      await queryClient.cancelQueries({ queryKey: REMINDERS_QUERY_KEY });
      const previous = queryClient.getQueryData<Reminder[]>(REMINDERS_QUERY_KEY) ?? [];
      queryClient.setQueryData<Reminder[]>(
        REMINDERS_QUERY_KEY,
        previous.map((reminder) =>
          reminder.documentId === documentId ? { ...reminder, ...payload } : reminder,
        ),
      );
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData(REMINDERS_QUERY_KEY, context.previous);
      }
      toast.error(t('reminderError'));
    },
    onSuccess: () => {
      toast.success(t('reminderUpdated'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: REMINDERS_QUERY_KEY });
    },
  });
}
