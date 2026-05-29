'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import type { ApplicationTemplate } from '@/modules/school-templates/types/school-templates.types';
import type {
  PublishImpact,
  PublishResult,
} from '@/modules/school-templates/types/publish.types';

interface PublishArgs {
  documentId: string;
  acknowledgeImpact?: boolean;
}

interface PublishEnvelope {
  data: ApplicationTemplate | null;
  meta?: { impact?: PublishImpact };
}

export function usePublishTemplate() {
  const t = useTranslations('SchoolTemplates');
  const queryClient = useQueryClient();

  return useMutation<PublishResult, Error, PublishArgs>({
    mutationFn: async ({ documentId, acknowledgeImpact }) => {
      const query = acknowledgeImpact ? '?acknowledgeImpact=true' : '';
      const res = await privateApi.post<PublishEnvelope>(
        `/api/application-templates/${documentId}/publish${query}`,
      );
      return {
        template: res.data.data,
        impact: res.data.meta?.impact ?? null,
      };
    },
    onSuccess: (result) => {
      if (result.template) {
        queryClient.invalidateQueries({ queryKey: ['school-templates', 'list'] });
        toast.success(t('publishSuccess'));
      }
    },
    onError: () => {
      toast.error(t('publishError'));
    },
  });
}
