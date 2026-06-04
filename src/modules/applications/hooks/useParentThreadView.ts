'use client';

import { useEffect, useRef } from 'react';
import { useParentMarkRead } from '@/modules/applications/queries/use-parent-mark-read.mutation';
import type { ParentMessageThreadItem } from '@/modules/applications/types/parent-message.types';

export function useParentThreadView(
  applicationDocumentId: string,
  messages: ParentMessageThreadItem[] | undefined,
) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const markedRef = useRef(new Set<string>());
  const markRead = useParentMarkRead(applicationDocumentId);
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
          message.senderRole !== 'parent' &&
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
