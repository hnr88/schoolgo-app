'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { privateApi } from '@/lib/axios';
import { REMINDERS_QUERY_KEY } from '@/modules/calendar/queries/use-reminders.query';
import type { Reminder } from '@/modules/calendar/types/reminder.types';

export function useDeleteReminder() {
  const queryClient = useQueryClient();
  const t = useTranslations('Calendar');

  return useMutation({
    mutationFn: async (documentId: string) => {
      await privateApi.delete(`/api/reminders/${documentId}`);
      return documentId;
    },
    onMutate: async (documentId: string) => {
      await queryClient.cancelQueries({ queryKey: REMINDERS_QUERY_KEY });
      const previous = queryClient.getQueryData<Reminder[]>(REMINDERS_QUERY_KEY) ?? [];
      queryClient.setQueryData<Reminder[]>(
        REMINDERS_QUERY_KEY,
        previous.filter((reminder) => reminder.documentId !== documentId),
      );
      return { previous };
    },
    onError: (_error, _documentId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(REMINDERS_QUERY_KEY, context.previous);
      }
      toast.error(t('reminderError'));
    },
    onSuccess: () => {
      toast.success(t('reminderDeleted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: REMINDERS_QUERY_KEY });
    },
  });
}
