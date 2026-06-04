'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  agentMessageSchema,
  type AgentMessageFormValues,
} from '@/modules/applications/schemas/agent-message.schema';
import { useSendMessage } from '@/modules/applications/queries/use-send-message.mutation';

export function useAgentMessageComposer(
  applicationDocumentId: string,
  options?: { onSent?: () => void; onError?: () => void },
) {
  const sendMessage = useSendMessage(applicationDocumentId);

  const form = useForm<AgentMessageFormValues>({
    resolver: zodResolver(agentMessageSchema),
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
