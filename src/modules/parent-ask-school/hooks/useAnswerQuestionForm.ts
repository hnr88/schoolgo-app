'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { answerQuestionFormSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { useAnswerQuestion } from '@/modules/parent-ask-school/queries/use-answer-question.mutation';
import type { AnswerQuestionFormValues } from '@/modules/parent-ask-school/types/ask-school.types';

interface UseAnswerQuestionFormArgs {
  questionDocumentId: string;
  onClose: () => void;
}

export function useAnswerQuestionForm({ questionDocumentId, onClose }: UseAnswerQuestionFormArgs) {
  const t = useTranslations('AskSchool');
  const answer = useAnswerQuestion();

  const form = useForm<AnswerQuestionFormValues>({
    resolver: zodResolver(answerQuestionFormSchema),
    defaultValues: { body: '', publish: true },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await answer.mutateAsync({
        questionDocumentId,
        body: values.body,
        publish: values.publish,
      });
      toast.success(values.publish ? t('answerPublishSuccess') : t('answerPrivateSuccess'));
      form.reset();
      onClose();
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      toast.error(message ?? t('answerError'));
    }
  });

  return { form, handleSubmit, isPending: answer.isPending };
}
