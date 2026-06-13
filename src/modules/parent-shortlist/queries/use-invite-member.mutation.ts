'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SHORTLIST_QUERY_KEY } from '@/modules/parent-shortlist/constants/shortlist.constants';
import { shortlistResponseSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { InviteMemberInput } from '@/modules/parent-shortlist/types/shortlist.types';

export function useInviteMember(shortlistDocumentId: string) {
  const t = useTranslations('ParentShortlist');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: InviteMemberInput) => {
      const { data } = await privateApi.post(
        `/api/shortlists/${shortlistDocumentId}/invite`,
        { email: input.email, role: input.role },
      );
      return shortlistResponseSchema.parse(data).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHORTLIST_QUERY_KEY });
      toast.success(t('inviteSuccess'));
    },
    onError: () => {
      toast.error(t('inviteError'));
    },
  });
}
