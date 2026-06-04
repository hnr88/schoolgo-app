'use client';

import { useEffect, useRef } from 'react';
import { useMarkRead } from '@/modules/applications/queries/use-mark-read.mutation';
import type { MessageThreadItem } from '@/modules/applications/types/detail.types';

export function useAgentThreadView(
  applicationDocumentId: string,
  messages: MessageThreadItem[] | undefined,
) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const markedRef = useRef(new Set<string>());
  const markRead = useMarkRead(applicationDocumentId);
  const lastCount = useRef(0);

  useEffect(() => {
    markedRef.current = new Set<string>();
    lastCount.current = 0;
  }, [applicationDocumentId]);

  useEffect(() => {
    if (!messages) return;
    if (messages.length !== lastCount.current) {
      lastCount.current = messages.length;
      bottomRef.current?.scrollIntoView({ block: 'end' });
    }
  }, [messages]);

  useEffect(() => {
    if (!messages) return;
    const unreadInbound = messages
      .filter(
        (message) =>
          message.senderRole !== 'agent' &&
          message.readAt === null &&
          !message.documentId.startsWith('optimistic-') &&
          !markedRef.current.has(message.documentId),
      )
      .map((message) => message.documentId);
    if (unreadInbound.length === 0) return;
    unreadInbound.forEach((id) => markedRef.current.add(id));
    markRead.mutate(unreadInbound);
  }, [messages, markRead]);

  return { bottomRef };
}
