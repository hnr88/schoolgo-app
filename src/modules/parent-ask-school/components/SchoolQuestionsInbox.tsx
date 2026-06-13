'use client';

import { useTranslations } from 'next-intl';
import { Inbox } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState, ErrorState } from '@/modules/core';
import { INBOX_FILTERS } from '@/modules/parent-ask-school/constants/ask-school.constants';
import { SchoolQuestionCard } from '@/modules/parent-ask-school/components/SchoolQuestionCard';
import { AnswerQuestionDialog } from '@/modules/parent-ask-school/components/AnswerQuestionDialog';
import { QuestionsSkeleton } from '@/modules/parent-ask-school/components/QuestionsSkeleton';
import {
  useSchoolQuestionsInbox,
  type InboxFilter,
} from '@/modules/parent-ask-school/hooks/useSchoolQuestionsInbox';

export function SchoolQuestionsInbox() {
  const t = useTranslations('AskSchool');
  const inbox = useSchoolQuestionsInbox();

  return (
    <div className='flex flex-col gap-6'>
      <Tabs value={inbox.filter} onValueChange={(v) => inbox.setFilter(v as InboxFilter)}>
        <TabsList>
          {INBOX_FILTERS.map((filter) => (
            <TabsTrigger key={filter} value={filter} className='text-foreground/80'>
              {t(`filter_${filter}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {inbox.isLoading ? (
        <QuestionsSkeleton />
      ) : inbox.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => inbox.refetch()}
          retryLabel={t('retry')}
        />
      ) : inbox.questions.length === 0 ? (
        <EmptyState framed icon={Inbox} title={t('inboxEmptyTitle')} description={t('inboxEmptySubtitle')} />
      ) : (
        <div className='flex flex-col gap-4'>
          {inbox.questions.map((question) => (
            <SchoolQuestionCard
              key={question.documentId}
              question={question}
              onAnswer={inbox.openAnswer}
            />
          ))}
        </div>
      )}

      <AnswerQuestionDialog
        open={inbox.active !== null}
        onOpenChange={(open) => !open && inbox.closeAnswer()}
        questionDocumentId={inbox.active?.documentId ?? null}
        questionBody={inbox.active?.body ?? ''}
      />
    </div>
  );
}
