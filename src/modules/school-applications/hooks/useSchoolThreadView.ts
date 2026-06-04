'use client';

import { useEffect, useRef } from 'react';
import { useMarkSchoolThreadRead } from '@/modules/school-applications/hooks/useMarkSchoolThreadRead';
import type { SchoolMessageThreadItem } from '@/modules/school-applications/types/school-applications.types';

export function useSchoolThreadView(
  applicationDocumentId: string,
  messages: SchoolMessageThreadItem[] | undefined,
) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(0);

  useMarkSchoolThreadRead(applicationDocumentId, messages);

  useEffect(() => {
    lastCount.current = 0;
  }, [applicationDocumentId]);

  useEffect(() => {
    if (!messages) return;
    if (messages.length !== lastCount.current) {
      lastCount.current = messages.length;
      bottomRef.current?.scrollIntoView({ block: 'end' });
    }
  }, [messages]);

  return { bottomRef };
}
