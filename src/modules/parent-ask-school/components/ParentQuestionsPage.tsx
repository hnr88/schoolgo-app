'use client';

import { useTranslations } from 'next-intl';
import { MessageCircleQuestion } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useParentQuestions } from '@/modules/parent-ask-school/queries/use-parent-questions.query';
import { AskSchoolDialog } from '@/modules/parent-ask-school/components/AskSchoolDialog';
import { QuestionCard } from '@/modules/parent-ask-school/components/QuestionCard';
import { QuestionsSkeleton } from '@/modules/parent-ask-school/components/QuestionsSkeleton';

export function ParentQuestionsPage() {
  const t = useTranslations('AskSchool');
  const { data, isLoading, isError, refetch } = useParentQuestions();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        title={t('parentTitle')}
        description={t('parentSubtitle')}
        actions={<AskSchoolDialog />}
      />

      {isLoading ? (
        <QuestionsSkeleton />
      ) : isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      ) : !data || data.length === 0 ? (
        <EmptyState
          framed
          icon={MessageCircleQuestion}
          title={t('emptyTitle')}
          description={t('emptySubtitle')}
          action={<AskSchoolDialog />}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          {data.map((question) => (
            <QuestionCard key={question.documentId} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
