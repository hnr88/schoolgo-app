'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  schoolMessageSchema,
  type SchoolMessageFormValues,
} from '@/modules/school-applications/schemas/school-message.schema';
import { useSendSchoolMessage } from '@/modules/school-applications/queries/use-school-messages.query';

export function useSchoolMessageComposer(
  applicationDocumentId: string,
  options?: { onSent?: () => void; onError?: () => void },
) {
  const sendMessage = useSendSchoolMessage(applicationDocumentId);

  const form = useForm<SchoolMessageFormValues>({
    resolver: zodResolver(schoolMessageSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  });

  const content = form.watch('content');

  const submit = form.handleSubmit((values) => {
    sendMessage.mutate(values.content.trim(), {
      onSuccess: () => {
        form.reset({ content: '' });
        options?.onSent?.();
      },
      onError: () => options?.onError?.(),
    });
  });

  return {
    form,
    content,
    charCount: content.length,
    isPending: sendMessage.isPending,
    submit,
  };
}
