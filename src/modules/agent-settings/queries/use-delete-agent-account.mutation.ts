'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { AgentDeleteAccountValues } from '@/modules/agent-settings/schemas/delete-account.schema';

export function useDeleteAgentAccount() {
  const t = useTranslations('AgentSettings');
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async (values: AgentDeleteAccountValues) => {
      const { data } = await privateApi.post<{ data: { message: string } }>(
        '/api/agents/me/delete-account',
        { data: { password: values.password } },
      );
      return data;
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    },
  });
}
