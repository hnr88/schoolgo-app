'use client';

import { useTranslations } from 'next-intl';
import { Building2, CornerDownRight } from 'lucide-react';
import { SurfaceCard } from '@/modules/core';
import { QuestionStatusBadge } from '@/modules/parent-ask-school/components/QuestionStatusBadge';
import { formatQuestionDate } from '@/modules/parent-ask-school/lib/format-question-date';
import type { ParentQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

export function QuestionCard({ question }: { question: ParentQuestion }) {
  const t = useTranslations('AskSchool');

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900'>
            <Building2 className='h-4 w-4 text-foggy' />
            {question.school?.name ?? t('unknownSchool')}
          </span>
          <span className='text-xs text-foggy'>
            {t(`topic_${question.topic}`)} · {formatQuestionDate(question.askedAt)}
          </span>
        </div>
        <QuestionStatusBadge status={question.status} />
      </div>

      <p className='text-sm text-foreground'>{question.body}</p>

      {question.answer ? (
        <div className='flex gap-2 rounded-lg bg-muted p-3'>
          <CornerDownRight className='mt-0.5 h-4 w-4 shrink-0 text-foggy' />
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold text-ink-900'>{t('answerHeading')}</span>
            <p className='text-sm text-foreground'>{question.answer.body}</p>
            <span className='text-xs text-foggy'>
              {formatQuestionDate(question.answer.answeredAt)}
            </span>
          </div>
        </div>
      ) : (
        <p className='text-xs text-foggy'>{t('awaitingAnswer')}</p>
      )}
    </SurfaceCard>
  );
}
