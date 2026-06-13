'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { shortlistNoteResponseSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { AddNoteInput } from '@/modules/parent-shortlist/types/shortlist.types';

export function useAddNote(itemDocumentId: string) {
  const t = useTranslations('ParentShortlist');

  return useMutation({
    mutationFn: async (input: AddNoteInput) => {
      const body = input.body?.trim() ? input.body.trim() : undefined;
      const { data } = await privateApi.post(
        `/api/shortlist-items/${itemDocumentId}/notes`,
        { body, reaction: input.reaction },
      );
      return shortlistNoteResponseSchema.parse(data).data;
    },
    onSuccess: () => {
      toast.success(t('addNoteSuccess'));
    },
    onError: () => {
      toast.error(t('addNoteError'));
    },
  });
}
