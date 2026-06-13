'use client';

import { useState } from 'react';
import { useSchoolQuestions } from '@/modules/parent-ask-school/queries/use-school-questions.query';
import type { QuestionStatus, SchoolQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

export type InboxFilter = QuestionStatus | 'all';

export function useSchoolQuestionsInbox() {
  const [filter, setFilter] = useState<InboxFilter>('pending');
  const [active, setActive] = useState<SchoolQuestion | null>(null);

  const status = filter === 'all' ? undefined : filter;
  const { data, isLoading, isError, refetch } = useSchoolQuestions(status);

  return {
    filter,
    setFilter,
    active,
    openAnswer: (question: SchoolQuestion) => setActive(question),
    closeAnswer: () => setActive(null),
    questions: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
