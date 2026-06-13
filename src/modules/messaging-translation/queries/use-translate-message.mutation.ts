'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { translateMessageResponseSchema } from '@/modules/messaging-translation/schemas/translate-message.schema';
import type { TranslateMessageResult } from '@/modules/messaging-translation/types/translate-message.types';

export function useTranslateMessage() {
  const t = useTranslations('MessagingTranslation');

  return useMutation<TranslateMessageResult, unknown, string>({
    mutationFn: async (messageDocumentId: string) => {
      const { data } = await privateApi.post(
        `/api/messages/${messageDocumentId}/translate`,
      );
      return translateMessageResponseSchema.parse(data).data;
    },
    onError: () => {
      toast.error(t('translateError'));
    },
  });
}
