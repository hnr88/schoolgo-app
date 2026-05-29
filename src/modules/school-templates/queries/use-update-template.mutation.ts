'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import type {
  ApplicationTemplate,
  TemplateData,
  StrapiSingle,
} from '@/modules/school-templates/types/school-templates.types';

interface UpdateTemplateArgs {
  documentId: string;
  templateData: TemplateData;
}

export function useUpdateTemplate() {
  const t = useTranslations('SchoolTemplates');
  const queryClient = useQueryClient();

  return useMutation<ApplicationTemplate, Error, UpdateTemplateArgs>({
    mutationFn: async ({ documentId, templateData }) => {
      const res = await privateApi.put<StrapiSingle<ApplicationTemplate>>(
        `/api/application-templates/${documentId}`,
        { data: { templateData } },
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-templates', 'list'] });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
