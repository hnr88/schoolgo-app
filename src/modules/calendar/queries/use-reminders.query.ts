'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { Reminder, RemindersResponse } from '@/modules/calendar/types/reminder.types';

export const REMINDERS_QUERY_KEY = ['parent', 'reminders'] as const;

export function useReminders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: REMINDERS_QUERY_KEY,
    enabled: isAuthenticated,
    retry: false,
    queryFn: async (): Promise<Reminder[]> => {
      try {
        const { data } = await privateApi.get<RemindersResponse>('/api/reminders/me');
        return data.data ?? [];
      } catch {
        // Reminders API is not live yet — fail soft so application events still render.
        return [];
      }
    },
  });
}
