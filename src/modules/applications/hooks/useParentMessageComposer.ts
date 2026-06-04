'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  parentMessageSchema,
  type ParentMessageFormValues,
} from '@/modules/applications/schemas/parent-message.schema';
import { useParentSendMessage } from '@/modules/applications/queries/use-parent-send-message.mutation';

export function useParentMessageComposer(
  applicationDocumentId: string,
  options?: { onSent?: () => void; onError?: () => void },
) {
  const sendMessage = useParentSendMessage(applicationDocumentId);

  const form = useForm<ParentMessageFormValues>({
    resolver: zodResolver(parentMessageSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  });

  const content = form.watch('content');

  const submit = form.handleSubmit((values) => {
    sendMessage.mutate(
      { content: values.content.trim() },
      {
        onSuccess: () => {
          form.reset({ content: '' });
          options?.onSent?.();
        },
        onError: () => options?.onError?.(),
      },
    );
  });

  return {
    form,
    content,
    charCount: content.length,
    isPending: sendMessage.isPending,
    submit,
  };
}
