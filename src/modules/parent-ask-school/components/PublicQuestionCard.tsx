'use client';

import { useTranslations } from 'next-intl';
import { CornerDownRight, UserRound } from 'lucide-react';
import { SurfaceCard } from '@/modules/core';
import { formatQuestionDate } from '@/modules/parent-ask-school/lib/format-question-date';
import type { SchoolQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

export function PublicQuestionCard({ question }: { question: SchoolQuestion }) {
  const t = useTranslations('AskSchool');

  return (
    <SurfaceCard className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink-900">
          <UserRound className="size-4 text-foggy" strokeWidth={1.75} aria-hidden="true" />
          {question.askedBy?.name ?? t('anonymousAsker')}
        </span>
        <span className="text-xs text-foggy">
          {t(`topic_${question.topic}`)} · {formatQuestionDate(question.askedAt)}
        </span>
      </div>

      <p className="text-body-sm text-foreground">{question.body}</p>

      {question.answer && (
        <div className="flex gap-2 rounded-lg bg-gray-50 p-4">
          <CornerDownRight className="mt-0.5 size-4 shrink-0 text-foggy" strokeWidth={1.75} aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-ink-900">{t('answerHeading')}</span>
            <p className="text-body-sm text-foreground">{question.answer.body}</p>
          </div>
        </div>
      )}
    </SurfaceCard>
  );
}
