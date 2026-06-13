'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { askAboutSchoolFormSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { useAskQuestion } from '@/modules/parent-ask-school/queries/use-ask-question.mutation';
import { PUBLIC_SCHOOL_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { AskAboutSchoolFormValues } from '@/modules/parent-ask-school/types/ask-school.types';

export function useAskAboutSchoolForm(schoolDocumentId: string, onSuccess: () => void) {
  const t = useTranslations('AskSchool');
  const ask = useAskQuestion();
  const queryClient = useQueryClient();

  const form = useForm<AskAboutSchoolFormValues>({
    resolver: zodResolver(askAboutSchoolFormSchema),
    defaultValues: { topic: 'admissions', body: '' },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await ask.mutateAsync({ schoolDocumentId, topic: values.topic, body: values.body });
      toast.success(t('askSuccess'));
      form.reset({ topic: 'admissions', body: '' });
      void queryClient.invalidateQueries({
        queryKey: [...PUBLIC_SCHOOL_QUESTIONS_QUERY_KEY, schoolDocumentId],
      });
      onSuccess();
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      toast.error(message ?? t('askError'));
    }
  });

  return { form, handleSubmit, isPending: ask.isPending };
}
