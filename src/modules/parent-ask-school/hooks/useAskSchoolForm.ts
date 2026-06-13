'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { askSchoolFormSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { useAskQuestion } from '@/modules/parent-ask-school/queries/use-ask-question.mutation';
import type { AskSchoolFormValues } from '@/modules/parent-ask-school/types/ask-school.types';

const DEFAULT_VALUES: AskSchoolFormValues = {
  schoolDocumentId: '',
  schoolName: '',
  topic: 'admissions',
  body: '',
};

export function useAskSchoolForm(onSuccess: () => void) {
  const t = useTranslations('AskSchool');
  const ask = useAskQuestion();

  const form = useForm<AskSchoolFormValues>({
    resolver: zodResolver(askSchoolFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await ask.mutateAsync({
        schoolDocumentId: values.schoolDocumentId,
        topic: values.topic,
        body: values.body,
      });
      toast.success(t('askSuccess'));
      form.reset(DEFAULT_VALUES);
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
