'use client';

import { useMutation } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import type {
  TemplateData,
  TemplateValidationResult,
  StrapiSingle,
} from '@/modules/school-templates/types/school-templates.types';

export function useValidateTemplate() {
  return useMutation<TemplateValidationResult, Error, TemplateData>({
    mutationFn: async (templateData) => {
      const res = await privateApi.post<StrapiSingle<TemplateValidationResult>>(
        '/api/application-templates/validate',
        { data: { templateData } },
      );
      return res.data.data;
    },
  });
}
