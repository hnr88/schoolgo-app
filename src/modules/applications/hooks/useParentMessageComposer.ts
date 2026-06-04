'use client';

import { useState } from 'react';
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
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<ParentMessageFormValues>({
    resolver: zodResolver(parentMessageSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  });

  const content = form.watch('content');

  const submit = form.handleSubmit((values) => {
    sendMessage.mutate(
      { content: values.content.trim(), attachments },
      {
        onSuccess: () => {
          form.reset({ content: '' });
          setAttachments([]);
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
    attachments,
    setAttachments,
    isPending: sendMessage.isPending,
    submit,
  };
}
