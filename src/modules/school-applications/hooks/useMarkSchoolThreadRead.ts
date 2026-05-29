'use client';

import { useEffect, useRef } from 'react';
import { useMarkSchoolMessagesRead } from '@/modules/school-applications/queries/use-school-messages.query';
import type { SchoolMessageThreadItem } from '@/modules/school-applications/types/school-applications.types';

export function useMarkSchoolThreadRead(
  applicationDocumentId: string,
  messages: SchoolMessageThreadItem[] | undefined,
) {
  const markRead = useMarkSchoolMessagesRead(applicationDocumentId);
  const markedRef = useRef(new Set<string>());

  useEffect(() => {
    if (!messages) return;
    const unreadInbound = messages
      .filter(
        (m) => m.senderRole === 'agent' && m.readAt === null && !markedRef.current.has(m.documentId),
      )
      .map((m) => m.documentId);
    if (unreadInbound.length === 0) return;
    unreadInbound.forEach((id) => markedRef.current.add(id));
    markRead.mutate(unreadInbound);
  }, [messages, markRead]);
}
