'use client';

import { useTranslations } from 'next-intl';
import { CornerDownRight, Globe, Lock, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { QuestionStatusBadge } from '@/modules/parent-ask-school/components/QuestionStatusBadge';
import { formatQuestionDate } from '@/modules/parent-ask-school/lib/format-question-date';
import type { SchoolQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

interface SchoolQuestionCardProps {
  question: SchoolQuestion;
  onAnswer: (question: SchoolQuestion) => void;
}

export function SchoolQuestionCard({ question, onAnswer }: SchoolQuestionCardProps) {
  const t = useTranslations('AskSchool');
  const Visibility = question.isPublic ? Globe : Lock;

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900'>
            <UserRound className='h-4 w-4 text-foggy' />
            {question.askedBy?.name ?? t('anonymousAsker')}
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
            <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900'>
              {t('answerHeading')}
              <Visibility className='h-3 w-3 text-foggy' />
            </span>
            <p className='text-sm text-foreground'>{question.answer.body}</p>
          </div>
        </div>
      ) : (
        <div>
          <Button type='button' size='sm' onClick={() => onAnswer(question)}>
            {t('answerCta')}
          </Button>
        </div>
      )}
    </SurfaceCard>
  );
}
